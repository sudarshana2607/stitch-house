import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/axiosConfig";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "", role: "customer" });
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.email || !formData.password) { alert("Please enter email and password"); return; }
    setLoading(true);
    try {
      const response = await api.post("/auth/login", { email: formData.email, password: formData.password });
      login(response.data.user, response.data.token);
      navigate(response.data.user.role === "tailor" ? "/tailor/dashboard" : "/customer/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally { setLoading(false); }
  };

  return (
    <div style={{
      minHeight: "100vh", width: "100vw",
      display: "flex", fontFamily: "'DM Sans', system-ui, sans-serif",
      background: "#0d1117",
    }}>
      {/* Left panel */}
      <div style={{
        flex: "1", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: "linear-gradient(145deg, #0d1117, #161b24)",
        borderRight: "1px solid rgba(212,175,55,0.12)",
        padding: "60px 48px", position: "relative", overflow: "hidden",
      }}>
        {/* bg grid */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: `linear-gradient(rgba(212,175,55,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.05) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "420px", width: "100%" }}>
          {/* Logo */}
          <div style={{ marginBottom: "48px" }}>
            <div style={{ fontSize: "1.6rem", color: "#d4af37", marginBottom: "4px" }}>✦</div>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "2.8rem", fontWeight: 600, color: "#f0ece4",
              lineHeight: 1.1, marginBottom: "8px",
            }}>
              Stitch<br /><span style={{ color: "#d4af37", fontStyle: "italic" }}>House</span>
            </h1>
            <p style={{ color: "#5e5a52", fontSize: "0.85rem", letterSpacing: "0.05em" }}>Premium Tailoring Management</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ background: "transparent", padding: 0, width: "100%", boxShadow: "none" }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "1.7rem", color: "#f0ece4", marginBottom: "6px",
            }}>Welcome back</h2>
            <p style={{ color: "#5e5a52", fontSize: "0.85rem", marginBottom: "32px" }}>Sign in to your account to continue</p>

            {[
              { label: "Email Address", name: "email", type: "email", placeholder: "you@example.com" },
              { label: "Password", name: "password", type: "password", placeholder: "••••••••" },
            ].map(f => (
              <div key={f.name} style={{ marginBottom: "18px" }}>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#5e5a52", marginBottom: "7px" }}>{f.label}</label>
                <input
                  type={f.type} name={f.name} value={formData[f.name]}
                  onChange={handleChange} placeholder={f.placeholder}
                  style={{
                    width: "100%", padding: "12px 16px",
                    background: "#1e2535", border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "8px", color: "#f0ece4",
                    fontFamily: "'DM Sans', system-ui", fontSize: "0.9rem",
                    outline: "none", transition: "all 0.2s ease",
                  }}
                  onFocus={e => { e.target.style.borderColor="#d4af37"; e.target.style.boxShadow="0 0 0 3px rgba(212,175,55,0.12)"; }}
                  onBlur={e => { e.target.style.borderColor="rgba(255,255,255,0.07)"; e.target.style.boxShadow="none"; }}
                />
              </div>
            ))}

            <div style={{ marginBottom: "28px" }}>
              <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#5e5a52", marginBottom: "7px" }}>Login As</label>
              <select
                name="role" value={formData.role} onChange={handleChange}
                style={{
                  width: "100%", padding: "12px 16px",
                  background: "#1e2535", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "8px", color: "#f0ece4",
                  fontFamily: "'DM Sans', system-ui", fontSize: "0.9rem",
                  outline: "none", cursor: "pointer",
                }}
              >
                <option value="customer">Customer</option>
                <option value="tailor">Tailor</option>
              </select>
            </div>

            <button
              type="submit" disabled={loading}
              style={{
                width: "100%", padding: "13px",
                background: loading ? "rgba(212,175,55,0.5)" : "#d4af37",
                color: "#0d1117", border: "none", borderRadius: "8px",
                fontSize: "0.95rem", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s ease", letterSpacing: "0.03em",
                boxShadow: loading ? "none" : "0 4px 16px rgba(212,175,55,0.3)",
              }}
              onMouseOver={e => { if (!loading) { e.currentTarget.style.background="#e8cc6a"; e.currentTarget.style.transform="translateY(-1px)"; }}}
              onMouseOut={e => { if (!loading) { e.currentTarget.style.background="#d4af37"; e.currentTarget.style.transform="translateY(0)"; }}}
            >
              {loading ? "Signing In…" : "Sign In"}
            </button>
          </form>

          <p style={{ marginTop: "24px", textAlign: "center", color: "#5e5a52", fontSize: "0.85rem" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#d4af37", fontWeight: 600 }}>Create one</Link>
          </p>
        </div>
      </div>

      {/* Right panel — decorative */}
      <div style={{
        width: "42%", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: "linear-gradient(145deg, #161b24, #0d1117)",
        padding: "60px 48px", gap: "28px",
      }}>
        {[
          { n: "01", title: "Tailor Portal", desc: "Manage orders, measurements & customers in one place." },
          { n: "02", title: "Customer Portal", desc: "Track your orders, chat with your tailor, stay informed." },
          { n: "03", title: "Real-time Chat", desc: "Instant messaging between tailors and customers." },
        ].map(c => (
          <div key={c.n} style={{
            width: "100%", maxWidth: "320px",
            background: "#161b24", border: "1px solid rgba(212,175,55,0.1)",
            borderRadius: "12px", padding: "22px 24px",
            display: "flex", gap: "16px", alignItems: "flex-start",
          }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: "rgba(212,175,55,0.4)", fontWeight: 600, flex: "0 0 auto", marginTop: "2px" }}>{c.n}</span>
            <div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", color: "#f0ece4", marginBottom: "4px" }}>{c.title}</h3>
              <p style={{ fontSize: "0.83rem", color: "#5e5a52", lineHeight: 1.6 }}>{c.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400&family=DM+Sans:wght@400;600;700&display=swap');`}</style>
    </div>
  );
}

export default Login;
