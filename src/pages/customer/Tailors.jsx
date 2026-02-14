import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function Tailors() {
  const [tailors] = useState([
    { id: 1, name: "Royal Stitch", location: "Chennai", rating: 4.8 }
  ]);

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
              <p><strong>Location:</strong> {tailor.location}</p>
              <p><strong>Rating:</strong> ⭐ {tailor.rating}</p>

              <button
                style={{
                  padding: "10px 20px",   // fixed padding
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
