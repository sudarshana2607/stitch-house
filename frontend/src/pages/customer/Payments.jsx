import { useState, useEffect } from "react";
import api from "../../api/axiosConfig";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [amount, setAmount] = useState("");
  
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchPayments();
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    if (!user) return;
    try {
      const response = await api.get(`/orders/customer/${user.id}`);
      setOrders(response.data.filter(o => o.status !== "Delivered"));
    } catch(err) {
      console.log(err);
    }
  };

  const fetchPayments = async () => {
    if (!user) return;
    try {
      const response = await api.get(`/payments/customer/${user.id}`);
      setPayments(response.data);
    } catch (error) {
      console.log("Error fetching payments:", error);
    }
  };

  const payNow = async () => {
    if (!orderId || !amount || !user) return;

    try {
      await api.post("/payments", {
        customer_id: user.id,
        order_id: orderId,
        amount: amount,
        payment_status: "Paid"
      });

      setOrderId("");
      setAmount("");
      alert("Payment successful!");
      fetchPayments();
    } catch (error) {
      console.log("Payment error:", error);
      alert("Payment failed. Make sure your inputs are correct.");
    }
  };

  return (
    <div className="layout">
      <Sidebar role="customer" />
      <div className="content">
        <Navbar />
        <h2>Make Payment</h2>

        {/* Payment Form */}
        <div className="card">
          <select
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            style={{ padding: "8px", marginRight: "10px", width: "30%" }}
          >
            <option value="">Select Order to Pay</option>
            {orders.map(o => (
              <option key={o.id} value={o.id}>Order #{o.id} - {o.dress_type}</option>
            ))}
          </select>
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
            <p>No payment history found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.order_id}</td>
                    <td>₹ {payment.amount}</td>
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