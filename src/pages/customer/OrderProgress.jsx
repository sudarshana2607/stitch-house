import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function OrderProgress() {
  const [orders] = useState([
    {
      id: 1,
      dress: "Wedding Gown",
      status: "Stitching",
      payment: "Paid",
      progress: 70,
      tailorMessage: "Sleeves completed. Final fitting tomorrow."
    }
  ]);

  return (
    <div className="layout">
      <Sidebar role="customer" />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div className="content">
          <h2>Order Progress</h2>

          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "8px",
                background: "#fff"
              }}
            >
              <h3>{order.dress}</h3>

              <p><strong>Status:</strong> {order.status}</p>

              <p>
                <strong>Payment:</strong>{" "}
                <span
                  style={{
                    color: order.payment === "Paid" ? "green" : "red",
                    fontWeight: "bold"
                  }}
                >
                  {order.payment}
                </span>
              </p>

              {/* Progress Bar */}
              <div
                style={{
                  width: "100%",
                  background: "#eee",
                  height: "20px",
                  borderRadius: "5px",
                  marginBottom: "10px"
                }}
              >
                <div
                  style={{
                    width: `${order.progress}%`,
                    height: "100%",
                    background:
                      order.progress === 100 ? "green" : "#103e6e",
                    borderRadius: "5px"
                  }}
                ></div>
              </div>

              <p><strong>Progress:</strong> {order.progress}%</p>

              {/* Tailor Message */}
              <div
                style={{
                  background: "#f4f6f9",
                  padding: "10px",
                  borderRadius: "6px",
                  marginTop: "10px"
                }}
              >
                <strong>Tailor Update:</strong>
                <p style={{ marginTop: "5px" }}>
                  {order.tailorMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderProgress;
