import { Link } from "react-router-dom";

function Sidebar({ role }) {
  return (
    <div className="sidebar">
      <h3>{role.toUpperCase()} PANEL</h3>

      {role === "tailor" && (
        <>
          <Link to="/tailor/dashboard">Dashboard</Link>
          <Link to="/tailor/customers">Customers</Link>
          <Link to="/tailor/orders">Orders</Link>
          <Link to="/tailor/measurements">Measurements</Link>
          <Link to="/tailor/payments">Payments</Link>
          <Link to="/tailor/messages">Messages</Link>
          <Link to="/tailor/history">History</Link>
          <Link to="/tailor/Progress">Progress</Link>
        </>
      )}

      {role === "customer" && (
        <>
          <Link to="/customer/dashboard">Dashboard</Link>
          <Link to="/customer/tailors">Tailors</Link>
          <Link to="/customer/orders">My Orders</Link>
          <Link to="/customer/payments">Payments</Link>
          <Link to="/customer/progress">Order Progress</Link>
        <Link to="/customer/messages" >Messages</Link>

        </>
      )}
    </div>
  );
}

export default Sidebar;
