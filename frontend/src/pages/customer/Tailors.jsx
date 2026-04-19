import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../api/axiosConfig";

function Tailors() {
  const [tailors, setTailors] = useState([]);
  const [orderInput, setOrderInput] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchTailors();
  }, []);

  const fetchTailors = async () => {
    try {
      const response = await api.get('/auth/tailors');
      setTailors(response.data);
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <div className="layout">
      <Sidebar role="customer" />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div className="content">
          <h2>Available Tailors</h2>

          {tailors.map((tailor) => (
            <div
              key={tailor.id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "8px",
                background: "#fff"
              }}
            >
              <h3>{tailor.name}</h3>
              <p><strong>Email:</strong> {tailor.email}</p>

              <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  placeholder="Enter dress details (e.g. Blue Suit)"
                  value={orderInput[tailor.id] || ""}
                  onChange={(e) => setOrderInput({ ...orderInput, [tailor.id]: e.target.value })}
                  style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
                <button
                  onClick={async () => {
                    if (!orderInput[tailor.id] || !user) return;
                    try {
                      await api.post('/orders', {
                        customer_id: user.id,
                        tailor_id: tailor.id,
                        dress_type: orderInput[tailor.id],
                        status: "Pending",
                        amount: 0
                      });
                      alert("Order successfully placed with " + tailor.name + "!");
                      setOrderInput({ ...orderInput, [tailor.id]: "" });
                    } catch (err) {
                      console.log(err);
                      alert("Failed to place order");
                    }
                  }}
                  style={{
                    padding: "8px 15px",
                    background: "#0b3766",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  Place Order
                </button>
              </div>
            </div>
          ))}

          {tailors.length === 0 && (
            <p>No Tailors Available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tailors;
