import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function TailorDashboard() {
  return (
    <div className="layout">
      <Sidebar role="tailor" />

      <div className="content">
        <Navbar />

        <h2>Dashboard Overview</h2>

        <div className="dashboard-grid">
          <div className="card">
            <h3>Total Orders</h3>
            <p>6</p>
          </div>

          <div className="card">
            <h3>Pending Orders</h3>
            <p>4</p>
          </div>

          <div className="card">
            <h3>Total Revenue</h3>
            <p>2000</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TailorDashboard;
