#parallel_function_calling.py
from main.views.chatbot.cb_common import client, model, makeup_response
import json
import re
from pprint import pprint 
from tavily import TavilyClient
import os

tavily = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))

#위도 경도
global_lat_lon = { 
           '서울':[37.57,126.98],'강원도':[37.86,128.31],'경기도':[37.44,127.55],
           '경상남도':[35.44,128.24],'경상북도':[36.63,128.96],'광주':[35.16,126.85],
           '대구':[35.87,128.60],'대전':[36.35,127.38],'부산':[35.18,129.08],
           '세종시':[36.48,127.29],'울산':[35.54,129.31],'전라남도':[34.90,126.96],
           '전라북도':[35.69,127.24],'제주도':[33.43,126.58],'충청남도':[36.62,126.85],
           '충청북도':[36.79,127.66],'인천':[37.46,126.71],
           'Boston':[42.36, -71.05],
           '도쿄':[35.68, 139.69]
          }

TRAVEL_DATA = {
    "속초": {
        "travel": ["설악산국립공원","영금정","속초중앙시장"],
        "festivities" : ["속초설악문화제","속초칠링비치페스티벌","속초해맞이축제"],
        "activity": ["설악산케이블카","속초해수욕장","속초아이대관람차","얼라이브하트"]
    },
    "강릉": {
        "travel": ["강릉솔향수목원","영진해변","경포대"],
        "festivities" : ["강릉커피축제","강릉단오제","강릉누들축제"],
        "activity": ["정동진레일바이크","강릉아라나비바다하늘자전거","강릉아르떼뮤지엄"]
    },
    "평창": {
        "travel": ["월정사전나무숲","이효석문화마을","오대산국립공원"],
        "festivities" : ["평창송어축제","평창농악축제","평창효석문화제"],
        "activity": ["허브나라농원","발왕산관광케이블카","대관령양떼목장","대관령하늘목장"]
    },
    "가평": {
        "travel": ["자라섬","남이섬","쁘띠프랑스","코스모피아천문","신비동물원가평"],
        "festivities" : ["가평양떼목장유채꽃축제","자라섬꽃페스타","에덴벚꽃길벚꽃축제"],
        "activity": ["가평별다리글램핑","가평레일파크","W홀스랜드","가평시티투어"]
    },
    "수원": {
        "travel": ["영흥수목원","광교산","수원화성"],
        "festivities" : ["수원재즈페스티벌","수원화성문화재","수원국가유산야행"],
        "activity": ["플라잉수원","기후변화체험교육관두드림","수원화성국궁체험장"]
    },
    "용인": {
        "travel": ["백남준아트센터","캐리비안베이","에버랜드","한국민속촌"],
        "festivities" : ["처인성문화제","용인청년페스티벌","대한민국조아용페스티벌"],
        "activity": ["용인레포츠","플라이스테이션","양지파인리조트스키장"]
    },
    "충주": {
        "travel": ["호암지생태공원","충주고구려비전시관","충주활옥동굴"],
    },
    "보령": {
        "travel": ["죽도","보령성주사지","대천해수욕장"],
    },
    "논산": {
        "travel": ["반야사","탑정호수변생태공원","온빛자연휴양림"],
    },
    "영동" : {
        "festivities" : ["영동난계국악축제"]
    },
    "옥천" : {
        "festivities" : ["향수옥천포도복숭아축제"]
    },
    "단양" : {
        "festivities" : ["다리안온축제"]
    },
    "당진" : {
        "activity": ["삽교호자전거터미널","삽교호놀이동산"]
    },
    "공주" : {
        "activity": ["공주경비행기"]
    },
    "함평": {
        "travel": ["함평엑스포공원","용천사꽃무릇공원","함평자연생태공원"],
    },
    "곡성": {
        "travel": ["섬진강기차마을","도림사","대황강자연휴식공원"],
    },
    "여수": {
        "travel": ["여수예술랜드","라테라스윈터빌리지어드벤처","한려해상국립공원"],
        "festivities" : ["여수밤바다불꽃축제"],
        "activity": ["여수스노클링","여수패러글라이딩"]
    },
    "전주" : {
        "festivities" : ["전주비빔밥축제","전주세계소리축제","전주가맥축제"]
    },
    "목포" : {
        "festivities" : ["목포문화유산야행","목포항구축제","목포세계마당페스티벌"]
    },
    "완도" : {
        "activity": ["완도바닥카약"]
    },
    "대구" : {
        "travel": ["대구스파밸리","수성못유원지","달성공원"],
        "festivities" : ["대구치맥페스티벌","대구국제뮤지컬페스티벌","대구약령시한방문화축제"],
        "activity": ["이월드","만촌인라인롤러스케이트장","앞산케이블카"]
    },
    "부산" : {
        "travel": ["롯데월드어드벤처부산","태종대","부산자갈치시장"],
        "festivities" : ["광안리어방축제","해운대모래축제","부산고등어축제"],
    },
    "울산" : {
        "travel": ["태화강국가정원","박상진의사생가","장생포고래박물관"],
        "festivities" : ["울산서머페스티벌","울산옹기축제","울산대공원장미축제"],
    },
    "제주" : {
        "travel": ["스누피가든","아르떼뮤지엄제주","제주4·3평화공원"],
        "festivities" : ["제주한잔우리술페스티벌","제주독서대"],
        "activity": ["제주레포츠랜드"]
    },
    "서귀포" : {
        "travel": ["천지연폭포","성산일출봉","카멜리아힐"],
        "festivities" : ["서귀포은갈치축제"],
        "activity": ["하모돌고래투어","쇠소깍카약"]
    },



}


def search_internet(**kwargs):
    raw_query = kwargs.get("search_query", "")
    print("[SEARCH RAW]", raw_query)

    query = raw_query.strip()

    # 1️⃣ 연도가 없으면 2025 강제 추가
    if not re.search(r"20\d{2}", query):
        query = f"{query} 2025"

    # 2️⃣ 과거 연도(2020~2024)는 전부 2025로 교체
    query = re.sub(r"202[0-4]", "2025", query)

    print("[SEARCH FINAL]", query)

    result = tavily.search(
        query=query,
        include_answer=True
    )

    answer = result.get("answer", "")
    print("[SEARCH ANSWER]", answer)

    return answer

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
                                "description": "광역시도, e.g. 서울, 경기",
                            }
                        },
                        "required": ["location"],
                    },
                },
            },
            {
                "type": "function",
                "function": {
                    "name": "search_internet",
                    "description": "답변 시 인터넷 검색이 필요하다고 판단되는 경우 수행",
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


    def analyze(self, user_message, tools):
        try:
            response = client.chat.completions.create(
                    model=model.basic,
                    messages=[{"role": "user", "content": user_message}],
                    tools=tools,
                    tool_choice="auto", 
                )
            message = response.choices[0].message
            message_dict = message.model_dump() 
            pprint(("message_dict=>", message_dict))
            return message, message_dict
        except Exception as e:
            print("Error occurred(analyze):",e)
            return makeup_response("[analyze 오류입니다]")
        

    def run(self, analyzed, analyzed_dict, context):
        context.append(analyzed)
        tool_calls = analyzed_dict['tool_calls']
        for tool_call in tool_calls:
            function = tool_call["function"]
            func_name = function["name"] 
            func_to_call = self.available_functions[func_name]        
            try:
                func_args = json.loads(function["arguments"])
                # 챗GPT가 알려주는 매개변수명과 값을 입력값으로하여 실제 함수를 호출한다.
                func_response = func_to_call(**func_args)
                context.append({
                    "tool_call_id": tool_call["id"],
                    "role": "tool",
                    "name": func_name, 
                    "content": str(func_response)
                })
            except Exception as e:
                print("Error occurred(run):",e)
                return makeup_response("[run 오류입니다]")
    
        return client.chat.completions.create(model=self.model,messages=context).model_dump()