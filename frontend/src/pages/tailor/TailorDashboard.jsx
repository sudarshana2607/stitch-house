import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useState, useEffect } from "react";
import api from "../../api/axiosConfig";

function TailorDashboard() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [stats, setStats] = useState({ totalOrders: 0, pendingOrders: 0, revenue: 0 });
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDashboardData();
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
    try {
      const response = await api.get(`/customers/tailor/${user.id}`);
      setCustomers(response.data);
    } catch(err) {
      console.log(err);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      const statsRes = await api.get(`/orders/dashboard?tailorId=${user.id}`);
      const r_orders = await api.get('/orders');
      const filteredOrders = r_orders.data.filter(o => o.tailor_id == user.id);

      setOrders(filteredOrders);
      setStats(statsRes.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    }
  };

  const filteredOrders = orders.filter(o =>
    o.dress_type?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="layout">
      <Sidebar role="tailor" />

      <div className="content">
        <Navbar />

        <div style={{marginBottom:"24px",paddingBottom:"18px",borderBottom:"1px solid var(--border-soft)"}}><p style={{fontSize:"0.68rem",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"var(--accent)",marginBottom:"4px"}}>Tailor Panel</p><h2 style={{margin:0}}>Dashboard Overview</h2></div>

        {/* Top Summary Cards */}
        <div className="dashboard-grid">

          <div className="card">
            <h4>Total Orders</h4>
            <h2>{stats.totalOrders}</h2>
          </div>

          <div className="card">
            <h4>Pending Orders</h4>
            <h2>{stats.pendingOrders}</h2>
          </div>

          <div className="card">
            <h4>Total Revenue</h4>
            <h2>₹ {stats.revenue}</h2>
          </div>
        </div>

        {/* Orders Table Section */}
        <div className="table-section">

          <div className="table-header">
            <h3>Order Directory</h3>

            <div className="actions">
              <input
                type="text"
                placeholder="Search customer..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="add-btn">+ Add</button>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Dress Type</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => {
                const customer = customers.find(c => c.id === order.customer_id);
                const customerName = customer ? customer.name : (order.real_customer_name || (order.customer_id ? `ID: ${order.customer_id}` : 'Walk-in'));

                return (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{customerName}</td>
                  <td>{order.dress_type}</td>
                  <td>
                    <span className={`status ${(order.status || 'Pending').replace(" ", "")}`}>
                      {order.status || 'Pending'}
                    </span>
                  </td>
                  <td>₹ {order.amount || 0}</td>
                </tr>
                );
              })}
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
}

export default TailorDashboard;
