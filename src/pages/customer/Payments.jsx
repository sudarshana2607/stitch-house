import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("payments")) || [];
    setPayments(saved);
  }, []);

  const payNow = () => {
    if (!orderId || !amount) return;

    const newPayments = [
      ...payments,
      {
        id: Date.now(),
        orderId,
        amount,
        status: "Paid"
      }
    ];

    setPayments(newPayments);
    localStorage.setItem("payments", JSON.stringify(newPayments));
    setOrderId("");
    setAmount("");
  };

  return (
    <div className="layout">
      <Sidebar role="customer" />
      <div className="content">
        <Navbar />
        <h2>Make Payment</h2>

        <div className="card">
          <input
            placeholder="Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <input
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={payNow}>Pay</button>
        </div>
      </div>
    </div>
  );
}

export default Payments;
