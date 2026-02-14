import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function History() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(saved.filter(o => o.status === "Completed"));
  }, []);

  return (
    <div className="layout">
      <Sidebar role="tailor" />
      <div className="content">
        <Navbar />
        <h2>Completed Orders</h2>

        {orders.map((o) => (
          <div key={o.id} className="card">
            {o.dress}
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
