// import { Navigate } from "react-router-dom";
import UserService from "./service/UserService"; // Adjust the path based on your project structure
import { JSX } from "react";
import { useState } from "react";


const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const user = UserService.getCurrentUser();
    const [showPopup] = useState(!user || user.userType !== "shelter");
  
    if (!showPopup) {
      return children; // If user is authorized, show the protected page
    }
  
    return (
        <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            maxWidth: "400px",
          }}
        >
          <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>
            Access Denied
          </h2>
          <p style={{ marginBottom: "20px", color: "#555" }}>
            Only shelter users can access this page.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            style={{
              backgroundColor: "#007BFF",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007BFF")}
          >
            Go to Home Page
          </button>
        </div>
      </div>
    );
  };
  
  export default ProtectedRoute;