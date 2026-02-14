import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(saved);
  }, []);

  return (
    <div className="layout">
      <Sidebar role="customer" />
      <div className="content">
        <Navbar />
        <h2>My Orders</h2>

        {orders.map((o) => (
          <div key={o.id} className="card">
            <h4>{o.dress}</h4>
            <p>Status: {o.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
