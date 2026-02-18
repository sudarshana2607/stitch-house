import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useState } from "react";

function CustomerDashboard() {

  const orders = [
    { id: "ORD01", tailor: "Sri Tailors", dress: "Shirt", status: "Pending", amount: 500 },
    { id: "ORD02", tailor: "Sri Tailors", dress: "Blazer", status: "In Progress", amount: 1500 },
    { id: "ORD03", tailor: "Sri Tailors", dress: "Pant", status: "Completed", amount: 800 },
  ];

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === "Pending").length;
  const completedOrders = orders.filter(o => o.status === "Completed").length;
  const totalSpent = orders
    .filter(o => o.status === "Completed")
    .reduce((sum, o) => sum + o.amount, 0);

  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter(o =>
    o.dress.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="layout">
      <Sidebar role="customer" />

      <div className="content">
        <Navbar />

        <h2>Customer Dashboard</h2>

        {/* Summary Cards */}
        <div className="dashboard-grid">

          <div className="card">
            <h4>Total Orders</h4>
            <h2>{totalOrders}</h2>
          </div>

          <div className="card">
            <h4>Pending Orders</h4>
            <h2>{pendingOrders}</h2>
          </div>

          <div className="card">
            <h4>Completed Orders</h4>
            <h2>{completedOrders}</h2>
          </div>

          <div className="card">
            <h4>Total Spent</h4>
            <h2>₹ {totalSpent}</h2>
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
                  <td>{order.tailor}</td>
                  <td>{order.dress}</td>
                  <td>
                    <span className={`status ${order.status.replace(" ", "")}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>₹ {order.amount}</td>
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
