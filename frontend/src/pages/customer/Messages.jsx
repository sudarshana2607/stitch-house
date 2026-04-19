import { useState, useEffect } from "react";
import api from "../../api/axiosConfig";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [tailors, setTailors] = useState([]);
  const [selectedTailorId, setSelectedTailorId] = useState("");
  const [input, setInput] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  // Load tailors on load
  useEffect(() => {
    fetchTailors();
  }, []);

  useEffect(() => {
    if (selectedTailorId) {
      fetchMessages(selectedTailorId);
    } else {
      setMessages([]);
    }
  }, [selectedTailorId]);

  const fetchTailors = async () => {
    try {
      const response = await api.get('/auth/tailors');
      setTailors(response.data);
    } catch(err) {
      console.log(err);
    }
  };

  const fetchMessages = async (tailorId) => {
    if (!user) return;
    try {
      const response = await api.get(`/messages/${user.id}/${tailorId}`);
      setMessages(response.data);
    } catch (error) {
      console.log("Error fetching messages:", error);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !selectedTailorId || !user) return;

    try {
      await api.post("/messages", {
        sender_id: user.id,
        receiver_id: selectedTailorId,
        message: input
      });

      setInput("");
      fetchMessages(selectedTailorId); // refresh messages
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  return (
    <div className="layout">
      <Sidebar role="customer" />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div className="content">
          <h2>Customer Messages</h2>

          <select 
            value={selectedTailorId} 
            onChange={(e) => setSelectedTailorId(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "4px" }}
          >
            <option value="">Select a Tailor</option>
            {tailors.map(t => (
              <option key={t.id} value={t.id}>{t.name} (ID: {t.id})</option>
            ))}
          </select>

          <div
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "6px",
              minHeight: "300px",
              marginBottom: "15px",
              background: "#fff",
              overflowY: "auto"
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  marginBottom: "10px",
                  padding: "8px",
                  background:
                    msg.sender_id === user?.id ? "#dbeafe" : "#f3f4f6",
                  borderRadius: "5px",
                  textAlign: msg.sender_id === user?.id ? "right" : "left"
                }}
              >
                <strong>
                  {msg.sender_id === user?.id ? "You" : "Tailor"}:
                </strong>
                <p style={{ margin: 0 }}>{msg.message}</p>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              placeholder="Type message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc"
              }}
            />

            <button
              onClick={handleSend}
              disabled={!selectedTailorId}
              style={{
                padding: "8px 15px",
                background: "#10107f",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;