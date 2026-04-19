import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../api/axiosConfig";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [text, setText] = useState("");
  
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (selectedCustomerId) {
      fetchMessages(selectedCustomerId);
    } else {
      setMessages([]);
    }
  }, [selectedCustomerId]);

  const fetchCustomers = async () => {
    if (!user) return;
    try {
      // Offline tailor customers
      const response = await api.get(`/customers/tailor/${user.id}`);
      let mappedCustomers = response.data.map(c => ({id: c.id, name: c.name, type: 'Offline'}));
      
      // Online Real App Customers
      try {
        const usersResp = await api.get('/auth/customers');
        const onlineUsers = usersResp.data.map(u => ({id: u.id, name: u.name, type: 'App User'}));
        mappedCustomers = [...mappedCustomers, ...onlineUsers];
      } catch (err) {}

      setCustomers(mappedCustomers);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMessages = async (customerId) => {
    if (!user) return;
    try {
      const response = await api.get(`/messages/${user.id}/${customerId}`);
      setMessages(response.data);
    } catch(err) {
      console.log(err);
    }
  };

  const sendMessage = async () => {
    if (!text || !selectedCustomerId || !user) return;
    try {
      await api.post("/messages", {
        sender_id: user.id,
        receiver_id: selectedCustomerId,
        message: text
      });
      setText("");
      fetchMessages(selectedCustomerId);
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <div className="layout">
      <Sidebar role="tailor" />
      <div className="content">
        <Navbar />
        <h2>Messages</h2>

        <div className="card">
          <select 
            value={selectedCustomerId} 
            onChange={(e) => setSelectedCustomerId(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
          >
            <option value="">Select a Customer</option>
            {customers.map(c => (
              <option key={c.id + c.type} value={c.id}>{c.name} ({c.type})</option>
            ))}
          </select>

          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type message..."
            disabled={!selectedCustomerId}
          />
          <button onClick={sendMessage} disabled={!selectedCustomerId}>
            Send
          </button>
        </div>

        {messages.map((m) => (
          <div key={m.id} className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>
                <b>{m.sender_id === user.id ? "You" : "Customer"}:</b> {m.message}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Messages;
