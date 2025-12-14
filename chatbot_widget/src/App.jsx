// src/App.jsx
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import "./index.css"; 

const SOCKET_URL = "http://localhost:3000"; 

// Varsayılan ID (Sadece sen geliştirme yaparken localhost'ta direkt açarsan çalışsın diye)
const DEV_DEFAULT_ID = "db0d9a7f-32eb-4bf5-ba58-a5cf08d48d58";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [chatId, setChatId] = useState(null);
  const messagesEndRef = useRef(null);

  // --- DİNAMİK ID ÇÖZÜMÜ ---
  // 1. Önce URL'e bak (?assistantId=...)
  // 2. Yoksa window objesine bak (Global değişken)
  // 3. O da yoksa test ID'sini kullan
  const getAssistantId = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("assistantId") || window.KREMNA_ASSISTANT_ID || DEV_DEFAULT_ID;
  };

  const ASSISTANT_ID = getAssistantId();
  // -------------------------

  // Iframe Boyutlandırma Sinyali
  useEffect(() => {
    if (window.parent) {
      window.parent.postMessage({
        type: "KREMNA_WIDGET_RESIZE",
        isOpen: isOpen
      }, "*");
    }
  }, [isOpen]);

  // Socket Bağlantısı
  useEffect(() => {
    if (isOpen && !socket) {
      console.log("Bağlanılıyor... Asistan ID:", ASSISTANT_ID); // Konsoldan ID'yi kontrol edebilirsin
      
      const newSocket = io(SOCKET_URL);

      newSocket.on("connect", () => {
        newSocket.emit("start_chat", { assistantId: ASSISTANT_ID });
      });

      newSocket.on("chat_started", (chat) => {
        setChatId(chat.id);
        if (chat.messages) setMessages(chat.messages);
      });

      newSocket.on("new_message", (msg) => {
        setMessages((prev) => [...prev, msg]);
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      });

      setSocket(newSocket);
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim() || !socket || !chatId) return;
    socket.emit("send_message", { chatId, content: input });
    setInput("");
  };

  return (
    <div className="widget-container">
      {/* SOHBET PENCERESİ */}
      <div className={`chat-window ${isOpen ? "open" : ""}`}>
        <div className="chat-header">
          <div className="header-info">
            <div className="bot-icon"><Bot size={24} /></div>
            <div>
              <h3>Asistan</h3>
              <span className="status"><span className="dot"></span> Çevrimiçi</span>
            </div>
          </div>
          <button className="close-btn" onClick={() => setIsOpen(false)}><X size={20} /></button>
        </div>

        <div className="chat-body">
          {messages.length === 0 && (
            <div className="empty-state">
              <p>Merhaba! Size nasıl yardımcı olabilirim?</p>
            </div>
          )}
          
          {messages.map((msg, index) => {
            const isUser = msg.role === 'user';
            return (
              <div key={index} className={`message-row ${isUser ? 'user' : 'bot'}`}>
                <div className="message-bubble">{msg.content}</div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-footer">
          <div className="input-wrapper">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Bir mesaj yazın..."
            />
            <button 
              className="send-btn"
              onClick={handleSend}
              disabled={!input.trim()}
            >
              <Send size={18} />
            </button>
          </div>
          <div className="branding">Powered by Kremna AI</div>
        </div>
      </div>

      {/* BUTON */}
      <button 
        className={`toggle-btn ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={32} />}
      </button>
    </div>
  );
}