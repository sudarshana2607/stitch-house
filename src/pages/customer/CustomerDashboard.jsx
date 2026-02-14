import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function CustomerDashboard() {
  return (
    <div className="layout">
      <Sidebar role="customer" />
      <div className="content">
        <Navbar />
        <h2>Customer Dashboard</h2>

        <div className="card">
          Active Orders: 2
        </div>

        <div className="card">
          Pending Payments: 1
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
