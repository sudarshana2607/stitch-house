import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const addCustomer = () => {
    if (!name) return;

    // If editing, update customer
    if (editIndex !== null) {
      const updatedCustomers = [...customers];
      updatedCustomers[editIndex] = name;
      setCustomers(updatedCustomers);
      setEditIndex(null);
    } else {
      // Add new customer
      setCustomers([...customers, name]);
    }

    setName("");
  };

  const handleEdit = (index) => {
    setName(customers[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const filteredCustomers = customers.filter((_, i) => i !== index);
    setCustomers(filteredCustomers);
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
            {editIndex !== null ? "Update Customer" : "Add Customer"}
          </button>
        </div>

        {customers.map((c, i) => (
          <div key={i} className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>{c}</span>

              <div>
                <button
                  onClick={() => handleEdit(i)}
                  style={{ marginRight: "10px" }}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(i)}
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
