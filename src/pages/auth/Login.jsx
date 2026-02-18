import { useState, useContext } from "react";
import { useNavigate,Link} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "customer"
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      alert("Please enter username and password");
      return;
    }

    login(formData);

    if (formData.role === "tailor") {
      navigate("/tailor/dashboard");
    } else {
      navigate("/customer/dashboard");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url("https://c4.wallpaperflare.com/wallpaper/398/881/185/thread-sewing-yarn-wallpaper-preview.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative"
      }}
    >
      {/* Make form slightly transparent so background shows */}
      <form
        onSubmit={handleSubmit}
        style={{
          width: "380px",
          padding: "40px",
          background: "rgba(30, 41, 59, 0.85)", // semi-transparent dark
          borderRadius: "16px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
          transition: "0.3s",
          color: "white"
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "5px",
            color: "#d2d7df",
            fontWeight: "600"
          }}
        >
          Stitch House
        </h2>

        <p
          style={{
            textAlign: "center",
            fontSize: "13px",
            color: "#eef1f6",
            marginBottom: "25px"
          }}
        >
          Welcome back! Please login to continue
        </p>

        {/* Username */}
        <div style={{ marginBottom: "18px" }}>
          <label style={{ fontWeight: "500", fontSize: "14px" }}>
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "11px",
              marginTop: "6px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "14px",
              outline: "none",
              transition: "0.3s"
            }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: "18px" }}>
          <label style={{ fontWeight: "500", fontSize: "14px" }}>
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "11px",
              marginTop: "6px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "14px",
              outline: "none",
              transition: "0.3s"
            }}
          />
        </div>

        {/* Role Selection */}
        <div style={{ marginBottom: "25px" }}>
          <label style={{ fontWeight: "500", fontSize: "14px" }}>
            Login As
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "11px",
              marginTop: "6px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "14px",
              outline: "none",
              cursor: "pointer"
            }}
          >
            <option value="customer">Customer</option>
            <option value="tailor">Tailor</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "white",
            color: "#060606",
            border: "none",
            borderRadius: "8px",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "0.3s"
          }}
          onMouseOver={(e) => (e.target.style.opacity = "0.9")}
          onMouseOut={(e) => (e.target.style.opacity = "1")}
        >
          Login
        </button>
      </form>
      <p style={{ marginTop: "15px", textAlign: "center", fontSize: "13px" }}>
  Don't have an account?{" "}
  <Link to="/register" style={{ color: "#ffffff", fontWeight: "600" }}>
    Register
  </Link>
</p>

    </div>
  );
}

export default Login;
