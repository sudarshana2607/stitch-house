import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axiosConfig";

const inputStyle = (focused) => ({
  width: "100%", padding: "11px 15px",
  background: "#1e2535",
  border: `1px solid ${focused ? "#d4af37" : "rgba(255,255,255,0.07)"}`,
  boxShadow: focused ? "0 0 0 3px rgba(212,175,55,0.12)" : "none",
  borderRadius: "8px", color: "#f0ece4",
  fontFamily: "'DM Sans', system-ui", fontSize: "0.875rem",
  outline: "none", transition: "all 0.2s ease",
  marginBottom: "14px",
});

function FocusInput({ type = "text", name, placeholder, value, onChange, required, as: Tag = "input", children, style = {} }) {
  const [focused, setFocused] = useState(false);
  return Tag === "select" ? (
    <select name={name} value={value} onChange={onChange} required={required}
      style={{ ...inputStyle(focused), cursor: "pointer", ...style }}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
      {children}
    </select>
  ) : Tag === "textarea" ? (
    <textarea name={name} placeholder={placeholder} value={value} onChange={onChange} required={required}
      style={{ ...inputStyle(focused), height: "72px", resize: "none", ...style }}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
  ) : (
    <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} required={required}
      style={{ ...inputStyle(focused), ...style }}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
  );
}

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "", gender: "", phone: "", address: "", role: "customer" });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/register", form);
      alert("Registration Successful!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally { setLoading(false); }
  };

  const Label = ({ children }) => (
    <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#5e5a52", marginBottom: "5px" }}>
      {children}
    </label>
  );

  return (
    <div style={{
      minHeight: "100vh", width: "100vw",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #0d1117 0%, #161b24 100%)",
      fontFamily: "'DM Sans', system-ui", padding: "40px 24px",
      position: "relative", overflow: "hidden",
    }}>
      {/* grid bg */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(rgba(212,175,55,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.04) 1px, transparent 1px)`,
        backgroundSize: "52px 52px", pointerEvents: "none",
      }} />

      <div style={{
        position: "relative", zIndex: 1,
        width: "100%", maxWidth: "460px",
        background: "#161b24",
        border: "1px solid rgba(212,175,55,0.14)",
        borderRadius: "16px", padding: "44px 40px",
        boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "1.4rem", color: "#d4af37", marginBottom: "8px" }}>✦</div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "2rem", fontWeight: 600, color: "#f0ece4", marginBottom: "6px",
          }}>Create Account</h2>
          <p style={{ color: "#5e5a52", fontSize: "0.84rem" }}>Join Stitch House today</p>
        </div>

        <form onSubmit={handleSubmit} style={{ background: "transparent", padding: 0, width: "100%", boxShadow: "none" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <div>
              <Label>Username</Label>
              <FocusInput name="username" placeholder="Your name" value={form.username} onChange={handleChange} required />
            </div>
            <div>
              <Label>Phone</Label>
              <FocusInput type="tel" name="phone" placeholder="Phone number" value={form.phone} onChange={handleChange} required />
            </div>
          </div>

          <Label>Email</Label>
          <FocusInput type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />

          <Label>Password</Label>
          <FocusInput type="password" name="password" placeholder="Create a password" value={form.password} onChange={handleChange} required />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <div>
              <Label>Gender</Label>
              <FocusInput as="select" name="gender" value={form.gender} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </FocusInput>
            </div>
            <div>
              <Label>Register As</Label>
              <FocusInput as="select" name="role" value={form.role} onChange={handleChange}>
                <option value="customer">Customer</option>
                <option value="tailor">Tailor</option>
              </FocusInput>
            </div>
          </div>

          <Label>Address</Label>
          <FocusInput as="textarea" name="address" placeholder="Your address" value={form.address} onChange={handleChange} required />

          <button
            type="submit" disabled={loading}
            style={{
              width: "100%", padding: "13px", marginTop: "4px",
              background: loading ? "rgba(212,175,55,0.5)" : "#d4af37",
              color: "#0d1117", border: "none", borderRadius: "8px",
              fontSize: "0.95rem", fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: "0.03em",
              boxShadow: loading ? "none" : "0 4px 16px rgba(212,175,55,0.3)",
              transition: "all 0.2s ease",
            }}
            onMouseOver={e => { if (!loading) e.currentTarget.style.background="#e8cc6a"; }}
            onMouseOut={e => { if (!loading) e.currentTarget.style.background="#d4af37"; }}
          >
            {loading ? "Creating Account…" : "Create Account"}
          </button>
        </form>

        <p style={{ marginTop: "22px", textAlign: "center", color: "#5e5a52", fontSize: "0.84rem" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#d4af37", fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&family=DM+Sans:wght@400;600;700&display=swap');`}</style>
    </div>
  );
}

export default Register;
