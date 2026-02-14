import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function Messages() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Tailor",
      text: "Your order is currently in stitching stage."
    }
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: "You",
      text: input
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div className="layout">
      <Sidebar role="customer" />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div className="content">
          <h2>Customer Messages</h2>

          <div
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "6px",
              minHeight: "300px",
              marginBottom: "15px",
              background: "#fff"
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  marginBottom: "10px",
                  padding: "8px",
                  background:
                    msg.sender === "You" ? "#dbeafe" : "#f3f4f6",
                  borderRadius: "5px"
                }}
              >
                <strong>{msg.sender}:</strong>
                <p style={{ margin: 0 }}>{msg.text}</p>
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
