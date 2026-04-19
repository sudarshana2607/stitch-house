import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../api/axiosConfig";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [dress, setDress] = useState("");
  const [customerId, setCustomerId] = useState("");

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

  const addOrder = async () => {
    if (!dress || !user) return;

    try {
      await api.post('/orders', {
        customer_id: customerId || null,
        tailor_id: user.id,
        dress_type: dress,
        status: "Pending",
        amount: 0 // Default amount
      });
      setDress("");
      setCustomerId("");
      fetchOrders();
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

  return (
    <div className="layout">
      <Sidebar role="tailor" />
      <div className="content">
        <Navbar />
        <h2>Orders</h2>

        <div className="card">
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <select 
              value={customerId} 
              onChange={(e) => setCustomerId(e.target.value)}
              style={{ flex: 1, padding: '8px' }}
            >
              <option value="">Select Customer (Optional)</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <input
              placeholder="Dress Type"
              value={dress}
              onChange={(e) => setDress(e.target.value)}
              style={{ flex: 1, padding: '8px' }}
            />
          </div>
          <button onClick={addOrder}>Add Order</button>
        </div>

        {orders.map((o) => {
          const customer = customers.find(c => c.id === o.customer_id);
          const customerName = customer ? customer.name : (o.real_customer_name || (o.customer_id ? `ID: ${o.customer_id}` : 'Walk-in'));
          
          return (
          <div key={o.id} className="card">
            <h4>{o.dress_type} - <span style={{fontSize: '0.9em', color: '#555'}}>{customerName}</span></h4>
            <p>Status: {o.status}</p>

            <button onClick={() => updateStatus(o.id, "Stitching")}>
              Stitch
            </button>

            <button onClick={() => updateStatus(o.id, "Ready")}>
              Ready
            </button>

            <button onClick={() => updateStatus(o.id, "Delivered")}>
              Deliver
            </button>
          </div>
          );
        })}
      </div>
    </div>
  );
}

export default Orders;
