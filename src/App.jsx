import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/auth/Dashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import TailorDashboard from "./pages/tailor/TailorDashboard";
import Customers from "./pages/tailor/Customers";
import Orders from "./pages/tailor/Orders";
import Measurements from "./pages/tailor/Measurements";
import Payments from "./pages/tailor/Payments";
import Messages from "./pages/tailor/Messages";
import History from "./pages/tailor/History";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import Tailors from "./pages/customer/Tailors";
import MyOrders from "./pages/customer/MyOrders";
import CustomerPayments from "./pages/customer/Payments";
import OrderProgress from "./pages/customer/OrderProgress";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomerMessages from "./pages/customer/Messages";
import Progress from "./pages/tailor/Progress";

function App() {
  return (
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Tailor Routes */}
      <Route path="/tailor/dashboard" element={
        <ProtectedRoute role="tailor">
          <TailorDashboard />
        </ProtectedRoute>
      } />
      <Route path="/tailor/customers" element={<Customers />} />
      <Route path="/tailor/orders" element={<Orders />} />
      <Route path="/tailor/measurements" element={<Measurements />} />
      <Route path="/tailor/payments" element={<Payments />} />
      <Route path="/tailor/messages" element={<Messages />} />
      <Route path="/tailor/history" element={<History />} />
      <Route path="/tailor/progress" element={<Progress />} />


      {/* Customer Routes */}
      <Route path="/customer/dashboard" element={<CustomerDashboard />} />
      <Route path="/customer/tailors" element={<Tailors />} />
      <Route path="/customer/orders" element={<MyOrders />} />
      <Route path="/customer/payments" element={<CustomerPayments />} />
      <Route path="/customer/progress" element={<OrderProgress />} />
      <Route path="/customer/messages" element={<CustomerMessages />} />

    </Routes>
  );
}

export default App;
