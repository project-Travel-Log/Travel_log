import { useEffect, useRef, useState } from "react";
import "./chatbot.css";
import { getchatbot,sendChatMessage } from "../../API/chatbot";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // 자동 스크롤
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

//--------------------------------------------------------------------------
// 이걸로 대화 답변 받아오는 정보 저장해서 return 애서 활용하면 됨
  const sendMessage = async () => {
    if (!input.trim()) return;

    // 1️⃣ 사용자 메시지 즉시 렌더
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");
    setLoading(true);

    try {
      // 2️⃣ 서버 호출
      const res = await sendChatMessage(input);

      setMessages(prev => [
        ...prev,
        { role: "assistant", content: res.data.response_message }
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "서버 오류가 발생했어." }
      ]);
    } finally {
      setLoading(false);
    }
  };
//--------------------------------------------------------------------------
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="container clearfix">
      <div className="chat">
        <div className="chat-header clearfix">
          <img
            src="/static/images/logo.jpg"
            alt="avatar"
            style={{ width: 60, borderRadius: 50, marginLeft: 10 }}
          />
          <div className="chat-about">여행지 추천</div>
        </div>

        <div className="chat-history">
          <ul style={{ listStyle: "none" }}>



         {/* -------------------------------------------------------------------- */}
        {/* 이부분 위에서 setMessages에 저장한 값을 맵으로 굴려서 사용하는거 임 여기가 중요 */}
         {/* -------------------------------------------------------------------- */}
            {messages.map((msg, idx) => (
              <li className="clearfix" key={idx}>
                <div
                  className={`message ${
                    msg.role === "user"
                      ? "my-message float-right"
                      : "other-message float-left"
                  }`}
                >
                  {msg.content}
                </div>
              </li>
            ))}

            {loading && (
              <li className="clearfix">
                <div className="message other-message float-left">
                  <div className="loading-dots">
                    <span /><span /><span />
                  </div>
                </div>
              </li>
            )}

            <div ref={chatEndRef} />
          </ul>
        </div>

        <div className="chat-message">
          <textarea
            placeholder="메시지를 입력하세요."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
        </div>
      </div>
    </div>
  );
}
