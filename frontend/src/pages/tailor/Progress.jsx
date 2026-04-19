import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../api/axiosConfig";

function Progress() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchOrders();
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    if (!user) return;
    try {
      const response = await api.get(`/customers/tailor/${user.id}`);
      setCustomers(response.data);
    } catch(err) {
      console.log(err);
    }
  };

  const fetchOrders = async () => {
    if (!user) return;
    try {
      const response = await api.get('/orders');
      const myOrders = response.data.filter(o => o.tailor_id == user.id);
      setOrders(myOrders);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}`, { status });
      fetchOrders();
    } catch (error) {
      console.log(error);
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
      <Sidebar role="tailor" />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div className="content">
          <h2>Manage Order Progress</h2>

          {orders.map((order) => {
            const customer = customers.find(c => c.id === order.customer_id);
            const customerName = customer ? customer.name : (order.real_customer_name || (order.customer_id ? `ID: ${order.customer_id}` : 'Walk-in'));

            return (
            <div
              key={order.id}
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "10px",
                marginBottom: "20px",
                background: "#fff"
              }}
            >
              <h3>{order.dress_type}</h3>
              <p><strong>Customer:</strong> {customerName}</p>
              <p><strong>Status:</strong> {order.status}</p>

              {/* Progress Bar */}
              <div
                style={{
                  width: "100%",
                  background: "#eee",
                  height: "20px",
                  borderRadius: "6px",
                  marginBottom: "10px"
                }}
              >
                <div
                  style={{
                    width: `${getProgressPercentage(order.status)}%`,
                    height: "100%",
                    background:
                      order.status === 'Delivered'
                        ? "green"
                        : "#1e293b",
                    borderRadius: "6px",
                    transition: "0.3s"
                  }}
                ></div>
              </div>

              <p><strong>Progress:</strong> {getProgressPercentage(order.status)}%</p>

              {/* Buttons to Update Progress */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                {['Pending', 'Stitching', 'Ready', 'Delivered'].map(status => (
                  <button 
                    key={status}
                    onClick={() => updateStatus(order.id, status)}
                    style={{ 
                      padding: '5px 10px', 
                      background: order.status === status ? '#1e293b' : '#cbd5e1',
                      color: order.status === status ? 'white' : 'black',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
            );
          })}

          {orders.length === 0 && (
            <p>No Orders Available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Progress;
