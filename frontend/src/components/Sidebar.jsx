import { Link, useLocation } from "react-router-dom";

const TAILOR_LINKS = [
  { to: "/tailor/dashboard",    label: "Dashboard" },
  { to: "/tailor/customers",    label: "Customers" },
  { to: "/tailor/orders",       label: "Orders" },
  { to: "/tailor/measurements", label: "Measurements" },
  { to: "/tailor/payments",     label: "Payments" },
  { to: "/tailor/messages",     label: "Messages" },
  { to: "/tailor/history",      label: "History" },
  { to: "/tailor/progress",     label: "Progress" },
];

const CUSTOMER_LINKS = [
  { to: "/customer/dashboard", label: "Dashboard" },
  { to: "/customer/tailors",   label: "Tailors" },
  { to: "/customer/orders",    label: "My Orders" },
  { to: "/customer/payments",  label: "Payments" },
  { to: "/customer/progress",  label: "Order Progress" },
  { to: "/customer/messages",  label: "Messages" },
];

function Sidebar({ role }) {
  const location = useLocation();
  const links = role === "tailor" ? TAILOR_LINKS : CUSTOMER_LINKS;

  return (
    <div className="sidebar">
      {/* Brand handled by ::before in CSS */}
      <h3>{role === "tailor" ? "Tailor Panel" : "Customer Panel"}</h3>

      <nav style={{ flex: 1, paddingBottom: "24px" }}>
        {links.map(({ to, label }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to} to={to}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                color: active ? "var(--accent-light)" : "var(--text-2)",
                textDecoration: "none",
                padding: "10px 24px", margin: "2px 10px",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.875rem", fontWeight: active ? 600 : 400,
                transition: "var(--tr)",
                background: active ? "var(--accent-dim)" : "transparent",
                borderLeft: active ? "2px solid var(--accent)" : "2px solid transparent",
                paddingLeft: active ? "22px" : "24px",
              }}
            >
              <span style={{
                width: "5px", height: "5px", borderRadius: "50%",
                background: active ? "var(--accent)" : "var(--text-3)",
                flexShrink: 0,
                boxShadow: active ? "0 0 8px var(--accent-glow)" : "none",
                transition: "var(--tr)",
              }} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom badge */}
      <div style={{
        margin: "0 10px 20px", padding: "12px 16px",
        borderRadius: "var(--radius-sm)",
        background: "var(--accent-dim)",
        border: "1px solid var(--border)",
      }}>
        <p style={{
          fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em",
          textTransform: "uppercase", color: "var(--accent)", marginBottom: "2px",
        }}>
          Stitch House
        </p>
        <p style={{ fontSize: "0.75rem", color: "var(--text-3)" }}>
          {role.charAt(0).toUpperCase() + role.slice(1)} account
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
