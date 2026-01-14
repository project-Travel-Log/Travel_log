# function_calling.py
from backend.views.chatbot.cb_common import client, makeup_response
import json
import requests
from pprint import pprint
from tavily import TavilyClient
import os

tavily = None
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")

if TAVILY_API_KEY:
    tavily = TavilyClient(api_key=TAVILY_API_KEY)

# 위도 경도
global_lat_lon = {
    '서울':[37.57,126.98], '강원도':[37.86,128.31], '경기도':[37.44,127.55],
    '경상남도':[35.44,128.24], '경상북도':[36.63,128.96], '광주':[35.16,126.85],
    '대구':[35.87,128.60], '대전':[36.35,127.38], '부산':[35.18,129.08],
    '세종시':[36.48,127.29], '울산':[35.54,129.31], '전라남도':[34.90,126.96],
    '전라북도':[35.69,127.24], '제주도':[33.43,126.58], '충청남도':[36.62,126.85],
    '충청북도':[36.79,127.66], '인천':[37.46,126.71],
}

def get_celsius_temperature(**kwargs):
    location = kwargs["location"]
    lat_lon = global_lat_lon.get(location)
    if lat_lon is None:
        return None

    lat, lon = lat_lon
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true"
    response = requests.get(url, timeout=10)
    data = response.json()
    temperature = data["current_weather"]["temperature"]
    print("temperature:", temperature)
    return temperature

def search_internet(**kwargs):
    """
    Tavily 검색 결과를 answer + 상위 링크 1~2개로 반환.
    """
    q = kwargs["search_query"]
    print("search_internet", kwargs)

    try:
        res = tavily.search(
            query=q,
            search_depth="advanced",
            include_answer=True,
            max_results=5
        )
        answer = res.get("answer", "") or ""
        results = res.get("results", []) or []

        top_links = []
        for r in results[:2]:
            url = r.get("url")
            title = r.get("title")
            if url:
                top_links.append({"title": title, "url": url})

        payload = {"answer": answer, "links": top_links}
        print("answer:", payload)
        return payload

    except Exception as e:
        print("search_internet exception:", e)
        return {"answer": "", "links": []}

tools = [
    {
        "type": "function",
        "function": {
            "name": "get_celsius_temperature",
            "description": "지정된 위치의 현재 섭씨 날씨 확인",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "광역시도, e.g. 서울, 부산, 강원도"
                    }
                },
                "required": ["location"]
            },
        }
    },
    {
        "type": "function",
        "function": {
            "name": "search_internet",
            "description": "답변 시 인터넷 검색이 필요하다고 판단되는 경우 수행 (답변+참고링크 반환)",
            "parameters": {
                "type": "object",
                "properties": {
                    "search_query": {
                        "type": "string",
                        "description": "인터넷 검색을 위한 검색어",
                    }
                },
                "required": ["search_query"],
            }
        }
    }
]

class FunctionCalling:
    def __init__(self, model):
        self.model = model
        self.available_functions = {
            "get_celsius_temperature": get_celsius_temperature,
            "search_internet": search_internet,
        }

    def analyze(self, user_message, tools, context=None):
        try:
            # application.py에서 이미 user 메시지가 context에 들어있는 경우가 많아서 중복 추가 방지
            if context:
                messages = context[:]
            else:
                messages = [{"role": "user", "content": user_message}]

            response = client.chat.completions.create(
                model=self.model,
                messages=messages,
                tools=tools,
                tool_choice="auto",
            )

            message = response.choices[0].message
            message_dict = message.model_dump()
            pprint(("message_dict=>", message_dict))
            return message, message_dict

        except Exception as e:
            print("Error occurred(analyze):", e)
            raise ValueError(f"[analyze 오류입니다]: {e}")

    def run(self, analyzed, analyzed_dict, context):
        # analyzed는 객체라서 dict로 넣는 게 안전
        context.append(analyzed.model_dump())

        tool_calls = analyzed_dict.get("tool_calls", [])
        try:
            for tool_call in tool_calls:
                function = tool_call["function"]
                func_name = function["name"]
                func_to_call = self.available_functions[func_name]

                func_args = json.loads(function.get("arguments") or "{}")
                func_response = func_to_call(**func_args)

                context.append({
                    "role": "tool",
                    "tool_call_id": tool_call["id"],
                    "content": json.dumps(func_response, ensure_ascii=False)
                })

            return client.chat.completions.create(
                model=self.model,
                messages=context
            ).model_dump()

        except Exception as e:
            print("Error occurred(run):", e)
            return makeup_response("[run 오류입니다]")
