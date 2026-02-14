import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [dress, setDress] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(saved);
  }, []);

  const saveOrders = (data) => {
    setOrders(data);
    localStorage.setItem("orders", JSON.stringify(data));
  };

  const addOrder = () => {
    if (!dress) return;

    const newOrders = [
      ...orders,
      {
        id: Date.now(),
        dress,
        status: "Pending"
      }
    ];

    saveOrders(newOrders);
    setDress("");
  };

  const updateStatus = (id, status) => {
    const updated = orders.map((o) =>
      o.id === id ? { ...o, status } : o
    );
    saveOrders(updated);
  };

  return (
    <div className="layout">
      <Sidebar role="tailor" />
      <div className="content">
        <Navbar />
        <h2>Orders</h2>

        <div className="card">
          <input
            placeholder="Dress Type"
            value={dress}
            onChange={(e) => setDress(e.target.value)}
          />
          <button onClick={addOrder}>Add Order</button>
        </div>

        {orders.map((o) => (
          <div key={o.id} className="card">
            <h4>{o.dress}</h4>
            <p>Status: {o.status}</p>

            <button onClick={() => updateStatus(o.id, "Stitching Started")}>
              Start
            </button>

            <button onClick={() => updateStatus(o.id, "Ready")}>
              Ready
            </button>

            <button onClick={() => updateStatus(o.id, "Completed")}>
              Complete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
