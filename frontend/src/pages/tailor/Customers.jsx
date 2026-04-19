import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../api/axiosConfig";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    if (!user) return;
    try {
      const response = await api.get(`/customers/tailor/${user.id}`);
      setCustomers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addCustomer = async () => {
    if (!name || !user) return;
    try {
      await api.post("/customers", { tailor_id: user.id, name });
      setName("");
      fetchCustomers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (index, id) => {
    try {
      await api.delete(`/customers/${id}`);
      fetchCustomers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="layout">
      <Sidebar role="tailor" />

      <div className="content">
        <Navbar />
        <h2>Customers</h2>

        <div className="card">
          <div className="form-group">
            <label>Customer Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button onClick={addCustomer}>
            Add Customer
          </button>
        </div>

        {customers.map((c, i) => (
          <div key={c.id} className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>{c.name}</span>

              <div>
                <button
                  onClick={() => handleDelete(i, c.id)}
                  style={{ background: "red", color: "white" }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Customers;
