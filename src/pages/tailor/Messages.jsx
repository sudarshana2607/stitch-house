import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("messages")) || [];
    setMessages(saved);
  }, []);

  const sendMessage = () => {
    if (!text) return;

    let updatedMessages;

    if (editId !== null) {
      // Update existing message
      updatedMessages = messages.map((m) =>
        m.id === editId ? { ...m, text } : m
      );
      setEditId(null);
    } else {
      // Add new message
      updatedMessages = [
        ...messages,
        { id: Date.now(), sender: "Tailor", text }
      ];
    }

    setMessages(updatedMessages);
    localStorage.setItem("messages", JSON.stringify(updatedMessages));
    setText("");
  };

  const handleEdit = (message) => {
    setText(message.text);
    setEditId(message.id);
  };

  const handleDelete = (id) => {
    const filteredMessages = messages.filter((m) => m.id !== id);
    setMessages(filteredMessages);
    localStorage.setItem("messages", JSON.stringify(filteredMessages));
  };

  return (
    <div className="layout">
      <Sidebar role="tailor" />
      <div className="content">
        <Navbar />
        <h2>Messages</h2>

        <div className="card">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type message..."
          />
          <button onClick={sendMessage}>
            {editId !== null ? "Update" : "Send"}
          </button>
        </div>

        {messages.map((m) => (
          <div key={m.id} className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>
                <b>{m.sender}:</b> {m.text}
              </span>

              <div>
                <button
                  onClick={() => handleEdit(m)}
                  style={{ marginRight: "10px" }}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(m.id)}
                  style={{ background: "red", color: "white" }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Messages;
