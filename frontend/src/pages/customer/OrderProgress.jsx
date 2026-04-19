import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../api/axiosConfig";

function OrderProgress() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;
      const response = await api.get(`/orders/customer/${user.id}`);
      setOrders(response.data);
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  const getProgressPercentage = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 100;
      case 'ready': return 80;
      case 'stitching': return 50;
      case 'pending': return 10;
      default: return 0;
    }
  };

  return (
    <div className="layout">
      <Sidebar role="customer" />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div className="content">
          <h2>Order Progress</h2>

          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "8px",
                background: "#fff"
              }}
            >
              <h3>{order.dress_type}</h3>

              <p><strong>Status:</strong> {order.status}</p>

              <p>
                <strong>Tailor ID:</strong> {order.tailor_id}
              </p>

              {/* Progress Bar */}
              <div
                style={{
                  width: "100%",
                  background: "#eee",
                  height: "20px",
                  borderRadius: "5px",
                  marginBottom: "10px"
                }}
              >
                <div
                  style={{
                    width: `${getProgressPercentage(order.status)}%`,
                    height: "100%",
                    background:
                      order.status === 'Delivered' ? "green" : "#103e6e",
                    borderRadius: "5px"
                  }}
                ></div>
              </div>

              <p><strong>Progress:</strong> {getProgressPercentage(order.status)}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderProgress;
