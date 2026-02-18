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
        status: "Paid",
        date: new Date().toLocaleDateString()
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

        {/* Payment Form */}
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

        {/* Payment History Section */}
        <div className="table-section" style={{ marginTop: "30px" }}>
          <h3>Payment History</h3>

          {payments.length === 0 ? (
            <p>TO : sri Tailors - Cloth : Size - Amount : 800 </p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.orderId}</td>
                    <td>₹ {payment.amount}</td>
                    <td>{payment.date}</td>
                    <td>
                      <span className="status Completed">
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}

export default Payments;
