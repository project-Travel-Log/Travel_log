# # chatbot_views.py
# from flask import request, session, Blueprint
# import re
# import os

# from main.views.chatbot.Chatbot import Chatbot
# from main.views.chatbot.cb_common import model,client
# from main.views.chatbot.characters import CHARACTERS, INSTRUCTION, build_system_prompt
# from main.views.chatbot.function_calling import FunctionCalling, tools
# from main.views.chatbot.travel_data import TRAVEL_DATA

# bp = Blueprint("chatbot", __name__)
# bp.secret_key = os.getenv("FLASK_SECRET_KEY", "dev-secret-key-change-me")

# # =========================
# # 1) 기본 시스템 프롬프트 (fallback)
# # =========================
# SYSTEM_PROMPT_ALL = build_system_prompt({"capital": CHARACTERS["capital"]}, INSTRUCTION)
# func_calling = FunctionCalling(model=model.basic)

# # =========================
# # 2) 지역 키워드 매핑
# # =========================
# REGION_KEYWORDS = {
#     # ================= 강원 =================
#     "강원": "gangwon", "강원도": "gangwon",
#     "속초": "gangwon", "강릉": "gangwon", "동해": "gangwon",
#     "평창": "gangwon", "춘천": "gangwon", "원주": "gangwon",
#     "태백": "gangwon", "삼척": "gangwon", "홍천": "gangwon",
#     "횡성": "gangwon", "영월": "gangwon", "정선": "gangwon",
#     "철원": "gangwon", "화천": "gangwon", "양구": "gangwon",
#     "인제": "gangwon", "고성": "gangwon", "양양": "gangwon",

#     # ================= 전라(모호 입력 처리용) =================
#     "전라": "jeonla",
#     "전라도": "jeonla",

#     # ================= 전북 =================
#     "전북": "jeonbug", "전라북도": "jeonbug",
#     "전주": "jeonbug", "군산": "jeonbug", "익산": "jeonbug",
#     "정읍": "jeonbug", "남원": "jeonbug", "김제": "jeonbug",
#     "완주": "jeonbug", "진안": "jeonbug", "무주": "jeonbug",
#     "장수": "jeonbug", "임실": "jeonbug", "순창": "jeonbug",
#     "고창": "jeonbug", "부안": "jeonbug",

#     # ================= 전남 =================
#     "전남": "jeonnam", "전라남도": "jeonnam",
#     "목포": "jeonnam", "여수": "jeonnam", "순천": "jeonnam",
#     "나주": "jeonnam", "광양": "jeonnam", "담양": "jeonnam",
#     "곡성": "jeonnam", "구례": "jeonnam", "고흥": "jeonnam",
#     "보성": "jeonnam", "화순": "jeonnam", "장흥": "jeonnam",
#     "강진": "jeonnam", "해남": "jeonnam", "영암": "jeonnam",
#     "무안": "jeonnam", "함평": "jeonnam", "영광": "jeonnam",
#     "장성": "jeonnam", "완도": "jeonnam", "진도": "jeonnam",
#     "신안": "jeonnam",

#     # ================= 부산/경남 =================
#     "경남": "busan", "경상남도": "busan",
#     "부산": "busan",

#     # ================= 대구/경북 =================
#     "경북": "daegu", "경상북도": "daegu",
#     "대구": "daegu",

#     # ================= 울산 =================
#     "울산": "ulsan",

#     # ================= 충청(모호 입력 처리용) =================
#     "충청": "chungcheong",
#     "충청도": "chungcheong",

#     # ================= 충북 =================
#     "충북": "chungbuk", "충청북도": "chungbuk",
#     "충주": "chungbuk", "단양": "chungbuk",
#     "옥천": "chungbuk", "영동": "chungbuk",

#     # ================= 충남 =================
#     "충남": "chungnam", "충청남도": "chungnam",
#     "공주": "chungnam", "보령": "chungnam",
#     "논산": "chungnam", "당진": "chungnam",

#     # ================= 수도권 =================
#     "수도권": "capital",
#     "서울": "capital", "경기": "capital", "경기도": "capital",
#     "수원": "capital", "용인": "capital", "가평": "capital",

#     # ================= 대전/세종 =================
#     "대전": "capital",
#     "세종": "capital", "세종시": "capital",

#     # ================= 제주 =================
#     "제주": "jeju", "제주도": "jeju", "서귀포": "jeju",
# }

# # =========================
# # 3) 유틸
# # =========================
# def is_greeting(text: str) -> bool:
#     t = text.strip().lower()
#     greetings = {
#         "안녕", "안녕하세요", "하이", "hi", "hello",
#         "시작", "시작할게", "시작하자", "시작해", "처음", "처음이야"
#     }
#     return t in greetings

# def pick_region_key(text: str):
#     t = re.sub(r"\s+", "", text)
#     for keyword in sorted(REGION_KEYWORDS.keys(), key=len, reverse=True):
#         if keyword in t:
#             return REGION_KEYWORDS[keyword]
#     return None

# def pick_city_key(text: str):
#     t = re.sub(r"\s+", "", text)
#     for city in sorted(TRAVEL_DATA.keys(), key=len, reverse=True):
#         if city in t:
#             return city
#     return None

# def should_use_tools(text: str) -> bool:
#     keywords = [
#         "날씨","기온","온도","비","눈","미세먼지",
#         "축제","행사","공연","페스티벌","이벤트",
#         "언제","기간","일정","날짜",
#         "오늘","내일","이번주","주말","요즘","현재","최신","최근",
#         "운영시간","시간","입장료","요금","가격","휴무","예약",
#         "검색","찾아줘","정보"
#     ]
#     return any(k in text for k in keywords)

# # =========================
# # 4) 세션별 Chatbot 관리
# # =========================
# def create_chatbot(region_key: str) -> Chatbot:
#     if region_key not in CHARACTERS:
#         region_key = "capital"

#     system_prompt = build_system_prompt(
#         {region_key: CHARACTERS[region_key]},
#         INSTRUCTION
#     )

#     return Chatbot(
#         use_model=model.basic,
#         system_role=system_prompt
#     )
# def send_request(self):
#     response = client.chat.completions.create(
#         model=self.use_model,
#         messages=self.context
#     )
#     return response.choices[0].message.content


# # =========================
# # 5) 라우팅
# # =========================
# @bp.route("/chatbot/ask", methods=["POST"])
# def chat_api():
#     user_input = request.json.get("request_message", "").strip()
#     print(f"[DEBUG] request.json : {request.json}")

#     if not user_input:
#         return {"response_message": "메시지를 입력해줘."}

#     # 1) 지역 / 도시 감지
#     region_key = pick_region_key(user_input)
#     city_key = pick_city_key(user_input)

#     # 2) 인사 처리 (세션 없으니 그냥 안내)
#     if is_greeting(user_input):
#         return {
#             "response_message": "어디 쪽 여행 가고 싶은지 말해봐. 지역 알려주면 그 말투로 바로 추천해줄게."
#         }

#     # 3) 모호 지역 처리
#     if region_key == "chungcheong":
#         return {
#             "response_message": (
#                 "충청도 좋지유. 근데 충북이랑 충남이랑 느낌이 좀 달라유.\n"
#                 "충북(옥천/충주/단양) 갈래유, 충남(논산/보령/당진) 갈래유?"
#             )
#         }

#     if region_key == "jeonla":
#         return {
#             "response_message": (
#                 "전라도 좋지잉. 근데 전북이랑 전남이랑 느낌이 좀 달라잉.\n"
#                 "전북(전주/고창) 갈래잉, 전남(함평/곡성/목포) 갈래잉?"
#             )
#         }

#     # 실수로 세션 저장하는거 다 날려서 세션값이 없어지는 바람에 region_key 이 값을 저장하질 못하는 오류 발생
#     #세션을 추가하든 5번째 "그래도없으면 고정 응답" 을 날려도 저장 안되서 다른 지역 이야기 하네 ㅎㅎ
#     # 나중에 추가하고 Css 수정하면 됨


#     # 4) city만 있으면 수도권 보정
#     if city_key and not region_key:
#         region_key = "capital"

#     # 5) region 없으면 기본 안내
#     if not region_key:
#         return {
#             "response_message": "어디 쪽 여행 가고 싶은지 말해봐. 지역 알려주면 그 말투로 바로 추천해줄게."
#         }

#     # 6)여기서 chatbot 생성
#     chatbot = create_chatbot(region_key)

#     # 7) 사용자 입력 추가
#     chatbot.add_user_message(user_input)

#     # 8) 로컬 도시 데이터 힌트 (기존 그대로)
#     if city_key and city_key in TRAVEL_DATA:
#         local = TRAVEL_DATA[city_key]
#         local_hint = {
#             "도시": city_key,
#             "여행지": local.get("travel", []),
#             "축제": local.get("festivities", []),
#             "액티비티": local.get("activity", []),
#         }

#         chatbot.add_user_message(
#             f"[로컬추천데이터]\n{local_hint}\n"
#             "위 데이터에서 2~3개만 골라 추천해. "
#             "다만 축제/기간/운영시간/입장료/예약/이번주/주말/오늘 같은 최신성이 필요한 내용은 "
#             "반드시 2025년 기준으로 검색해서 확인해."
#             "연도가 명시되지 않은 과거 정보는 사용하지 마."
#         )

#     # 9) tool 사용 여부 판단
#     analyzed = None
#     analyzed_dict = {}
#     if should_use_tools(user_input):
#         analyzed, analyzed_dict = func_calling.analyze(
#             user_input,
#             tools,
#             context=chatbot.context[:]
#         )

#     # 10) 실행
#     if analyzed_dict.get("tool_calls"):
#         response = func_calling.run(
#             analyzed,
#             analyzed_dict,
#             chatbot.context[:]
#         )
#     else:
#         response = chatbot.send_request()

#     chatbot.add_response_message(response)

#     return {
#         "response_message": chatbot.get_last_response()
#     }