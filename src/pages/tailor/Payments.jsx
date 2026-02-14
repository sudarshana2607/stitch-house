import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function Payments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("payments")) || [];
    setPayments(saved);
  }, []);

  return (
    <div className="layout">
      <Sidebar role="tailor" />
      <div className="content">
        <Navbar />
        <h2>Payment History</h2>

        {payments.map((p) => (
          <div key={p.id} className="card">
            Order ID: {p.orderId} <br />
            Amount: ₹{p.amount} <br />
            Status: {p.status}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Payments;
