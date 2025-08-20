import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/login",
        formData,
        { withCredentials: true }
      );
      // Since backend redirects to LinkedIn, this might open automatically
      if (res.data.redirect) {
        window.location.href = res.data.redirect;
      }
    } catch (error) {
      console.error(error);
      alert("Login failed!");
    }
  };

  return (
   <div style={{ 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    height: "100vh", 
    backgroundColor: "#f3f4f6" 
}}>
  <div style={{ 
      backgroundColor: "#ffffff", 
      padding: "30px", 
      borderRadius: "10px", 
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)", 
      width: "300px", 
      textAlign: "center" 
  }}>
    <h2 style={{ marginBottom: "20px", color: "#333" }}>Login</h2>
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        style={{ 
          marginBottom: "15px", 
          padding: "10px", 
          border: "1px solid #ccc", 
          borderRadius: "5px", 
          fontSize: "14px" 
        }}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        style={{ 
          marginBottom: "15px", 
          padding: "10px", 
          border: "1px solid #ccc", 
          borderRadius: "5px", 
          fontSize: "14px" 
        }}
      />
      <button 
        type="submit" 
        style={{ 
          padding: "10px", 
          backgroundColor: "#4f46e5", 
          color: "#fff", 
          border: "none", 
          borderRadius: "5px", 
          cursor: "pointer", 
          fontSize: "15px" 
        }}
      >
        Login
      </button>
    </form>
  </div>
</div>

  );
}
