import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const features = [
    { icon: "✦", title: "Order Management", desc: "Track every order from placement to delivery with real-time status updates." },
    { icon: "✦", title: "Measurements", desc: "Store precise customer measurements and access them any time, from anywhere." },
    { icon: "✦", title: "Messaging", desc: "Chat directly with tailors or customers without leaving the platform." },
    { icon: "✦", title: "Payments", desc: "Monitor payments, track revenue, and manage your billing history effortlessly." },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0d1117 0%, #161b24 50%, #0d1117 100%)",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      color: "#f0ece4",
      overflowX: "hidden",
    }}>

      {/* Subtle grid texture */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(212,175,55,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(212,175,55,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        pointerEvents: "none",
      }} />

      {/* Hero */}
      <section style={{
        position: "relative", zIndex: 1,
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "60px 24px",
      }}>

        {/* Brand mark */}
        <div style={{
          fontSize: "2.5rem", color: "#d4af37", marginBottom: "12px",
          letterSpacing: "0.2em", animation: "fadeDown 0.6s ease both",
        }}>✦</div>

        <p style={{
          fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.3em",
          textTransform: "uppercase", color: "#d4af37",
          marginBottom: "20px", animation: "fadeDown 0.6s 0.1s ease both", opacity: 0,
          animationFillMode: "both",
        }}>
          Premium Tailoring Management
        </p>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(3rem, 8vw, 6.5rem)",
          fontWeight: 600, lineHeight: 1.0,
          color: "#f0ece4",
          marginBottom: "16px",
          animation: "fadeDown 0.6s 0.18s ease both",
          animationFillMode: "both",
          opacity: 0,
        }}>
          Stitch<br />
          <span style={{ color: "#d4af37", fontStyle: "italic" }}>House</span>
        </h1>

        <p style={{
          fontSize: "clamp(1rem, 2vw, 1.15rem)",
          color: "#a8a090", maxWidth: "520px", lineHeight: 1.7,
          marginBottom: "48px",
          animation: "fadeDown 0.6s 0.26s ease both",
          animationFillMode: "both", opacity: 0,
        }}>
          Where precision meets elegance. Manage every stitch, order, and customer from a single, beautiful platform.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center",
          animation: "fadeDown 0.6s 0.34s ease both",
          animationFillMode: "both", opacity: 0,
        }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "14px 36px",
              background: "#d4af37", color: "#0d1117",
              border: "none", borderRadius: "8px",
              fontSize: "0.95rem", fontWeight: 700,
              cursor: "pointer", letterSpacing: "0.04em",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 20px rgba(212,175,55,0.35)",
            }}
            onMouseOver={e => { e.currentTarget.style.background="#e8cc6a"; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 30px rgba(212,175,55,0.5)"; }}
            onMouseOut={e => { e.currentTarget.style.background="#d4af37"; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 20px rgba(212,175,55,0.35)"; }}
          >
            Sign In
          </button>

          <button
            onClick={() => navigate("/register")}
            style={{
              padding: "14px 36px",
              background: "transparent", color: "#d4af37",
              border: "1.5px solid rgba(212,175,55,0.5)",
              borderRadius: "8px", fontSize: "0.95rem", fontWeight: 600,
              cursor: "pointer", letterSpacing: "0.04em",
              transition: "all 0.2s ease",
            }}
            onMouseOver={e => { e.currentTarget.style.background="rgba(212,175,55,0.1)"; e.currentTarget.style.borderColor="#d4af37"; e.currentTarget.style.transform="translateY(-2px)"; }}
            onMouseOut={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.borderColor="rgba(212,175,55,0.5)"; e.currentTarget.style.transform="translateY(0)"; }}
          >
            Create Account
          </button>
        </div>

        {/* Decorative line */}
        <div style={{
          marginTop: "64px", display: "flex", alignItems: "center", gap: "16px",
          animation: "fadeDown 0.6s 0.42s ease both",
          animationFillMode: "both", opacity: 0,
        }}>
          <div style={{ width: "60px", height: "1px", background: "rgba(212,175,55,0.3)" }} />
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "#5e5a52", textTransform: "uppercase" }}>Trusted by tailors & customers</span>
          <div style={{ width: "60px", height: "1px", background: "rgba(212,175,55,0.3)" }} />
        </div>
      </section>

      {/* Features */}
      <section style={{
        position: "relative", zIndex: 1,
        padding: "80px 24px",
        maxWidth: "1100px", margin: "0 auto",
      }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#d4af37", marginBottom: "12px" }}>
            Everything You Need
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 600, color: "#f0ece4",
          }}>
            Built for Tailors, Loved by Customers
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
        }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: "#161b24",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "12px", padding: "28px 24px",
              transition: "all 0.22s ease",
              cursor: "default",
              position: "relative", overflow: "hidden",
            }}
              onMouseOver={e => {
                e.currentTarget.style.borderColor = "rgba(212,175,55,0.3)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,0.5)";
              }}
              onMouseOut={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ fontSize: "1.1rem", color: "#d4af37", marginBottom: "14px", letterSpacing: "0.1em" }}>{f.icon}</div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.2rem", fontWeight: 600, color: "#f0ece4", marginBottom: "8px",
              }}>{f.title}</h3>
              <p style={{ fontSize: "0.86rem", color: "#a8a090", lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer strip */}
      <footer style={{
        position: "relative", zIndex: 1,
        borderTop: "1px solid rgba(212,175,55,0.12)",
        padding: "24px", textAlign: "center",
        color: "#5e5a52", fontSize: "0.78rem", letterSpacing: "0.05em",
      }}>
        © {new Date().getFullYear()} Stitch House &nbsp;·&nbsp; Crafted with precision
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400&family=DM+Sans:wght@400;600;700&display=swap');
        @keyframes fadeDown {
          from { opacity:0; transform:translateY(-16px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;
