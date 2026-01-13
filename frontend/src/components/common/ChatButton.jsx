import { useEffect, useRef, useState } from "react";
import { sendChatMessage, resetChatbot } from "../../API/chatbot";

const makeId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;
const STORAGE_KEY = "travellog_chat_messages_v1";
const TOP_SHOW_Y = 300;

const DEFAULT_MESSAGES = [{ id: makeId(), role: "bot", text: "어디 여행 가고 싶은지 말해봐." }];

const ChatFabButton = () => {
  const [open, setOpen] = useState(false);
  const [hasTopBtn, setHasTopBtn] = useState(false);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return DEFAULT_MESSAGES;
  });

  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  // ✅ 닫을 때: UI 닫기 + 로컬 대화 삭제 + 서버 세션 대화 삭제
  const closeAndReset = async () => {
    setOpen(false);

    // 프론트 저장된 대화 삭제
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (_) {}

    // 화면 메시지 초기화
    setMessages([{ id: makeId(), role: "bot", text: "어디 여행 가고 싶은지 말해봐." }]);

    // 서버 세션 초기화
    try {
      await resetChatbot();
    } catch (e) {
      console.error("resetChatbot error:", e);
    }
  };

  // 메시지 저장(새로고침 유지)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (_) {}
  }, [messages]);

  // scroll event
  useEffect(() => {
    const onScroll = () => setHasTopBtn(window.scrollY > TOP_SHOW_Y);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 열릴 때 포커스
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  // 스크롤 하단 고정
  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  // ✅ ESC 닫기 → reset까지 같이
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape" && open) closeAndReset();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // ✅ 패널 바깥 클릭 닫기 (fab 클릭은 예외) → reset까지 같이
  useEffect(() => {
    const onMouseDown = (e) => {
      if (!open) return;
      const panel = panelRef.current;
      if (!panel) return;

      if (panel.contains(e.target)) return;

      const fab = document.getElementById("chat-fab");
      if (fab && fab.contains(e.target)) return;

      closeAndReset();
    };

    window.addEventListener("mousedown", onMouseDown);
    return () => window.removeEventListener("mousedown", onMouseDown);
  }, [open]);

  const append = (msg) => setMessages((prev) => [...prev, msg]);
  const patch = (id, partial) =>
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, ...partial } : m)));

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    append({ id: makeId(), role: "user", text });
    setInput("");
    setLoading(true);

    const botId = makeId();
    append({ id: botId, role: "bot", text: "", pending: true });

    try {
      const res = await sendChatMessage(text);
      const reply =
        res?.data?.response_message ??
        res?.data?.responseMessage ??
        res?.data?.answer ??
        "응답을 가져오지 못했어.";

      patch(botId, { text: reply, pending: false, error: false });
    } catch (err) {
      const status = err?.response?.status;
      const serverMsg =
        err?.response?.data?.message || err?.response?.data?.error || err?.message;

      patch(botId, {
        text: status
          ? `요청 실패 (${status})${serverMsg ? `: ${serverMsg}` : ""}`
          : `서버에 문제가 생겼어. 잠깐 뒤에 다시 해봐.${serverMsg ? ` (${serverMsg})` : ""}`,
        pending: false,
        error: true,
      });

      console.error("sendChatMessage error:", status, err?.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  // Enter 전송 / Shift+Enter 줄바꿈 / IME 조합 중 Enter 방지
  const onInputKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (e.nativeEvent?.isComposing) return;
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <button
        id="chat-fab"
        className={`chat-fab ${hasTopBtn ? "with-top" : "no-top"}`}
        aria-label="help"
        type="button"
        onClick={() => {
          if (open) closeAndReset();
          else setOpen(true);
        }}
      >
        <img src="/images/고양.png" alt="" />
      </button>

      <div
        className={`chat-backdrop ${open ? "open" : ""}`}
        aria-hidden={!open}
        onClick={closeAndReset}
      />

      <div
        className={`chatbot-panel ${open ? "open" : ""} ${hasTopBtn ? "with-top" : "no-top"}`}
        ref={panelRef}
        aria-hidden={!open}
      >
        <div className="chatbot-header">
          <div>
            <strong>TRAVELLOG 챗봇</strong>
            <p>여행 추천을 도와드려요</p>
          </div>
          <button type="button" onClick={closeAndReset} aria-label="닫기">
            ×
          </button>
        </div>

        <div className="chatbot-body" ref={scrollRef}>
          {messages.map((m) => (
            <div
              key={m.id}
              className={`chatbot-bubble ${m.role === "user" ? "user" : "bot"} ${
                m.error ? "error" : ""
              }`}
            >
              {m.pending ? "…" : m.text}
            </div>
          ))}
        </div>

        <div className="chatbot-footer">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="어디 갈까?"
            onKeyDown={onInputKeyDown}
            disabled={loading}
          />
          <button type="button" onClick={sendMessage} disabled={loading}>
            전송
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatFabButton;
