import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "240px",        // same as sidebar width
        right: "0",
        height: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        background: "#1e293b",   // same as sidebar
        color: "#fff",
        zIndex: "800",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}
    >
      <h3 style={{ margin: 0 }}>Stitch House</h3>

      <button
        onClick={handleLogout}
        style={{
          padding: "4px 8px",
          border: "none",
          background: "#ef4444",
          color: "#fff",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
