import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useState, useEffect } from "react";
import api from "../../api/axiosConfig";

function CustomerDashboard() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ totalOrders: 0, pendingOrders: 0, revenue: 0 });
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      const [ordersRes, statsRes] = await Promise.all([
        api.get(`/orders/customer/${user.id}`),
        api.get(`/orders/dashboard?customerId=${user.id}`)
      ]);

      setOrders(ordersRes.data);
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
      <Sidebar role="customer" />

      <div className="content">
        <Navbar />

        <div style={{marginBottom:"24px",paddingBottom:"18px",borderBottom:"1px solid var(--border-soft)"}}><p style={{fontSize:"0.68rem",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"var(--accent)",marginBottom:"4px"}}>Customer Panel</p><h2 style={{margin:0}}>Dashboard</h2></div>

        {/* Summary Cards */}
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
            <h4>Total Spent</h4>
            <h2>₹ {stats.revenue}</h2>
          </div>
        </div>

        {/* Orders Table */}
        <div className="table-section">

          <div className="table-header">
            <h3>My Orders</h3>

            <div className="actions">
              <input
                type="text"
                placeholder="Search dress..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tailor</th>
                <th>Dress</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.tailor_id || 'N/A'}</td>
                  <td>{order.dress_type}</td>
                  <td>
                    <span className={`status ${(order.status || 'Pending').replace(" ", "")}`}>
                      {order.status || 'Pending'}
                    </span>
                  </td>
                  <td>₹ {order.amount || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
}

export default CustomerDashboard;
