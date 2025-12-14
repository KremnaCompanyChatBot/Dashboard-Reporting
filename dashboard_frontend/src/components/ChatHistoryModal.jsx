import { useEffect, useState } from "react";
import axios from "axios";
import { X, MessageSquare, User, Bot, Calendar } from "lucide-react";

export default function ChatHistoryModal({ open, onClose, assistant }) {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && assistant) {
      fetchChats();
    } else {
      setChats([]);
      setSelectedChat(null);
    }
  }, [open, assistant]);

  const fetchChats = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/chats/assistant/${assistant.id}`);
      
      // Boş sohbetleri filtrele
      const nonEmptyChats = res.data.filter(chat => chat.messages && chat.messages.length > 0);
      
      setChats(nonEmptyChats);

      if (nonEmptyChats.length > 0) {
        setSelectedChat(nonEmptyChats[0]);
      }
    } catch (err) {
      console.error("Geçmiş yüklenemedi:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!open || !assistant) return null;

  // --- KRİTİK DÜZELTME BURADA ---
  // Seçili sohbetin mesajlarını tarihe göre (Eskiden -> Yeniye) sıralıyoruz.
  // [...selectedChat.messages] kullanarak orijinal diziyi bozmadan kopya üzerinde işlem yapıyoruz.
  const sortedMessages = selectedChat 
    ? [...selectedChat.messages].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) 
    : [];

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white w-full max-w-5xl h-[80vh] rounded-2xl shadow-2xl flex overflow-hidden border border-gray-200">
        
        {/* SOL TARAF: LİSTE */}
        <div className="w-1/3 bg-gray-50 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-white">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <MessageSquare size={20} className="text-blue-600" />
              Sohbet Geçmişi
            </h3>
            <p className="text-xs text-gray-500 mt-1">{assistant.name}</p>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {loading ? (
              <div className="text-center py-10 text-gray-400">Yükleniyor...</div>
            ) : chats.length === 0 ? (
              <div className="text-center py-10 text-gray-400 text-sm flex flex-col items-center">
                <MessageSquare size={32} className="mb-2 opacity-20" />
                Henüz mesajlaşma olmamış.
              </div>
            ) : (
              chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`p-3 rounded-lg cursor-pointer transition-all border ${
                    selectedChat?.id === chat.id
                      ? "bg-white border-blue-300 shadow-sm ring-1 ring-blue-100"
                      : "bg-transparent border-transparent hover:bg-gray-100 hover:border-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-gray-700 text-sm">
                      {chat.title || "Ziyaretçi"}
                    </span>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1">
                      <Calendar size={10} />
                      {new Date(chat.createdAt).toLocaleDateString("tr-TR")}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {/* Son mesajı göster (Sıralamadan bağımsız Backend'den gelen dizinin son elemanı genelde son mesajdır) */}
                    {chat.messages[chat.messages.length - 1]?.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* SAĞ TARAF: DETAY */}
        <div className="w-2/3 flex flex-col bg-white">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
            <div>
              <h4 className="font-bold text-gray-800">
                {selectedChat ? (selectedChat.title || "Sohbet Detayı") : "Sohbet Seçin"}
              </h4>
              {selectedChat && (
                <span className="text-xs text-gray-400">
                  {new Date(selectedChat.createdAt).toLocaleString("tr-TR")}
                </span>
              )}
            </div>
            <button onClick={onClose} className="p-2 hover:bg-red-50 rounded-full text-gray-400 hover:text-red-500 transition">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
            {selectedChat ? (
              // BURADA sortedMessages KULLANIYORUZ
              sortedMessages.map((msg, idx) => {
                const isUser = msg.role === 'user';
                return (
                  <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex max-w-[80%] gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isUser ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {isUser ? <User size={16} /> : <Bot size={16} />}
                      </div>
                      
                      <div className={`p-3 rounded-2xl text-sm shadow-sm ${
                        isUser 
                          ? 'bg-blue-600 text-white rounded-tr-none' 
                          : 'bg-white border border-gray-200 text-gray-700 rounded-tl-none'
                      }`}>
                        {msg.content}
                        <div className={`text-[10px] mt-1 text-right ${isUser ? 'text-blue-200' : 'text-gray-400'}`}>
                          {new Date(msg.createdAt).toLocaleTimeString("tr-TR", {hour: '2-digit', minute:'2-digit'})}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-300">
                <MessageSquare size={64} className="mb-4 opacity-20" />
                <p>Görüntülemek için soldan bir sohbet seçin.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}