import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useState } from "react";

function TailorDashboard() {

  const orders = [
    { id: "ORD01", customer: "Ravi Kumar", type: "Shirt", status: "Pending", amount: 500 },
    { id: "ORD02", customer: "Suresh", type: "Pant", status: "In Progress", amount: 700 },
    { id: "ORD03", customer: "Arun", type: "Blazer", status: "Completed", amount: 1200 },
    { id: "ORD04", customer: "Kiran", type: "Shirt", status: "Pending", amount: 450 },
  ];

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === "Pending").length;
  const completedOrders = orders.filter(o => o.status === "Completed").length;
  const totalRevenue = orders
    .filter(o => o.status === "Completed")
    .reduce((sum, o) => sum + o.amount, 0);

  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter(o =>
    o.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="layout">
      <Sidebar role="tailor" />

      <div className="content">
        <Navbar />

        <h2>Dashboard Overview</h2>

        {/* Top Summary Cards */}
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
            <h4>Total Revenue</h4>
            <h2>₹ {totalRevenue}</h2>
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
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.type}</td>
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

export default TailorDashboard;
