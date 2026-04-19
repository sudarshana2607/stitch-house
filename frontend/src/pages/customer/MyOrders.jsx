import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../api/axiosConfig";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      if (!user) {
        console.log("User not logged in");
        return;
      }

      const response = await api.get(
        `/orders/customer/${user.id}`,
        {
          headers: {
            authorization: token
          }
        }
      );

      setOrders(response.data);
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  return (
    <div className="layout">
      <Sidebar role="customer" />
      <div className="content">
        <Navbar />
        <h2>My Orders</h2>

        {orders.length === 0 && <p>No orders found.</p>}
        {orders.map((o) => (
          <div key={o.id} className="card">
            <h4>{o.dress_type}</h4>
            <p><strong>Tailor ID:</strong> {o.tailor_id}</p>
            <p><strong>Status:</strong> {o.status}</p>
            <p><strong>Amount:</strong> ₹{o.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;