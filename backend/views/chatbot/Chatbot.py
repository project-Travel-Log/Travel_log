# Chatbot.py
from backend.views.chatbot.cb_common import model, client, gpt_num_tokens, makeup_response
import math

# ✅ RateLimitError를 안정적으로 import (SDK 버전 차이 대비)
try:
    from openai import RateLimitError
except Exception:
    RateLimitError = Exception


class Chatbot:
    def __init__(self, system_role, use_model=model.basic):
        self.model = use_model
        self.context = [{"role": "system", "content": system_role}]
        self.max_token_size = 16 * 1024

        # ✅ 레이트리밋/비용 안정화를 위한 기본 세팅
        self.max_output_tokens = 220     # 너무 길게 출력 안 하게
        self.temperature = 0.2          # 형식(사투리/반말) 강제에 유리

        # ✅ 컨텍스트 트림 기준(최근 메시지만 유지)
        self.keep_last_n = 12           # system + 최근 12개(유저/어시스턴트 포함)

    def trim_context(self, keep_last_n: int = None):
        """system 메시지 + 최근 N개만 유지해서 매 요청 토큰 폭발 방지"""
        if keep_last_n is None:
            keep_last_n = self.keep_last_n

        if len(self.context) > (1 + keep_last_n):
            self.context = [self.context[0]] + self.context[-keep_last_n:]

    def handle_token_limit(self, response):
        """(기존 유지) model usage 기반 토큰 제한 처리"""
        try:
            if isinstance(response, dict) and response.get('usage', {}).get('total_tokens', 0) > self.max_token_size:
                remove_size = math.ceil(len(self.context) / 10)
                self.context = [self.context[0]] + self.context[remove_size + 1:]
        except Exception as e:
            print(f'handle_token_limit exception : {e}')

    def add_user_message(self, message: str):
        self.context.append({"role": "user", "content": message})

    def _send_request(self):
        try:
            # ✅ 매 요청 전에 컨텍스트를 먼저 자르고 시작
            self.trim_context()

            # ✅ 토큰 계산: 너무 커지면 최근 대화 더 줄이고 재시도
            if gpt_num_tokens(self.context, model=self.model) > self.max_token_size:
                # system + 최근 8개로 더 줄여서 안전하게
                self.trim_context(keep_last_n=8)

            # 그래도 크면 마지막 유저 메시지 제거하고 안내
            if gpt_num_tokens(self.context, model=self.model) > self.max_token_size:
                # 방금 넣은 user 메시지 하나 빼기
                if len(self.context) > 1 and self.context[-1]["role"] == "user":
                    self.context.pop()
                return makeup_response('메시지를 조금 짧게 보내 줄래?')

            response = client.chat.completions.create(
                model=self.model,
                messages=self.context,
                temperature=self.temperature,
                max_tokens=self.max_output_tokens
            ).model_dump()

        except RateLimitError as e:
            # ✅ 레이트리밋이면 UX 좋게
            print(f'RateLimitError: {e}')
            return makeup_response("지금 요청이 몰려서 잠깐 막혔다. 30~40초 뒤에 한 번만 다시 보내라.")

        except Exception as e:
            print(f'Exception 오류({type(e)} 발생 : {e})')
            return makeup_response('[Chatbot에 문제가 발생했습니다. 잠시 뒤 이용해 주세요.]')

        return response

    def send_request(self):
        return self._send_request()

    def add_response_message(self, response: dict):
        assistant_msg = response["choices"][0]["message"]
        content = assistant_msg.get("content") or ""

        self.context.append({
            "role": assistant_msg["role"],
            "content": content
        })

    def get_last_response(self) -> str:
        last_msg = self.context[-1]["content"]
        print(last_msg)
        return last_msg
