import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function Progress() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "Priya",
      dress: "Wedding Gown",
      status: "Stitching",
      progress: 60
    }
  ]);

  const updateProgress = (id, value) => {
    setOrders(
      orders.map((order) =>
        order.id === id
          ? {
              ...order,
              progress: value,
              status:
                value === 100
                  ? "Completed"
                  : value >= 50
                  ? "Stitching"
                  : "In Progress"
            }
          : order
      )
    );
  };

  return (
    <div className="layout">
      <Sidebar role="tailor" />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div className="content">
          <h2>Manage Order Progress</h2>

          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "10px",
                marginBottom: "20px",
                background: "#fff"
              }}
            >
              <h3>{order.dress}</h3>
              <p><strong>Customer:</strong> {order.customer}</p>
              <p><strong>Status:</strong> {order.status}</p>

              {/* Progress Bar */}
              <div
                style={{
                  width: "100%",
                  background: "#eee",
                  height: "20px",
                  borderRadius: "6px",
                  marginBottom: "10px"
                }}
              >
                <div
                  style={{
                    width: `${order.progress}%`,
                    height: "100%",
                    background:
                      order.progress === 100
                        ? "green"
                        : "#1e293b",
                    borderRadius: "6px",
                    transition: "0.3s"
                  }}
                ></div>
              </div>

              <p><strong>Progress:</strong> {order.progress}%</p>

              {/* Slider to Update Progress */}
              <input
                type="range"
                min="0"
                max="100"
                value={order.progress}
                onChange={(e) =>
                  updateProgress(order.id, Number(e.target.value))
                }
                style={{ width: "100%" }}
              />
            </div>
          ))}

          {orders.length === 0 && (
            <p>No Orders Available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Progress;
