import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => { logout(); navigate("/"); };

  // Derive page title from path
  const segment = location.pathname.split("/").pop();
  const pageTitle = segment
    ? segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
    : "Dashboard";

  return (
    <div className="navbar">
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <h3 style={{ color: "var(--accent)", fontFamily: "var(--font-display)", fontSize: "1.3rem", letterSpacing: "0.04em" }}>
          ✦ Stitch House
        </h3>
        <span style={{
          fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em",
          textTransform: "uppercase", color: "var(--text-3)",
          paddingLeft: "16px", borderLeft: "1px solid var(--border-soft)",
        }}>
          {pageTitle}
        </span>
      </div>

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <button
          onClick={() => document.body.classList.toggle("dark")}
          style={{
            padding: "6px 14px", background: "var(--surface-2)",
            color: "var(--text-2)", border: "1px solid var(--border-soft)",
            borderRadius: "6px", fontSize: "0.78rem", fontWeight: 500,
            cursor: "pointer", transition: "var(--tr)",
          }}
          onMouseOver={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.color="var(--text-1)"; }}
          onMouseOut={e => { e.currentTarget.style.borderColor="var(--border-soft)"; e.currentTarget.style.color="var(--text-2)"; }}
        >
          ◑ Theme
        </button>

        <button
          onClick={handleLogout}
          style={{
            padding: "6px 14px", background: "rgba(224,82,82,0.12)",
            color: "var(--danger)", border: "1px solid rgba(224,82,82,0.2)",
            borderRadius: "6px", fontSize: "0.78rem", fontWeight: 600,
            cursor: "pointer", transition: "var(--tr)",
          }}
          onMouseOver={e => { e.currentTarget.style.background="rgba(224,82,82,0.22)"; }}
          onMouseOut={e => { e.currentTarget.style.background="rgba(224,82,82,0.12)"; }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Navbar;
