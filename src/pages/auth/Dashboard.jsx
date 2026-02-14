// Full corrected Dashboard.js with external image example:
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url("https://c4.wallpaperflare.com/wallpaper/398/881/185/thread-sewing-yarn-wallpaper-preview.jpg")`, // Tailoring-themed image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white",
        textShadow: "1px 1px 4px rgba(0,0,0,0.7)"
      }}
    >
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
        Welcome to Stitch House
      </h1>
      <p style={{ fontSize: "20px", marginBottom: "30px" }}>
        Explore our stitching & tailoring services
      </p>
      <button
        onClick={handleLoginClick}
        style={{
          padding: "12px 30px",
          fontSize: "18px",
          fontWeight: "600",
          color: "white",
          background: "#1562dc",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "0.3s"
        }}
        onMouseOver={(e) => (e.target.style.opacity = "0.9")}
        onMouseOut={(e) => (e.target.style.opacity = "1")}
      >
        Go to Login
      </button>
    </div>
  );
}

export default Dashboard;
