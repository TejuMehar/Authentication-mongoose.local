// src/pages/Signup.jsx
import { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    username: "",
    mobile: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json(); // always parse response

    if (res.ok) {
      alert("Signup successful!");
      window.location.href = "/login";
    } else {
      alert(data.message || "Signup failed");
    }
  } catch (error) {
    console.error("Network or server error:", error);
    alert("Unable to connect to server. Please try again later.");
  }
};



// put this ABOVE your component
const inputStyle = {
  width: "100%",
  padding: "12px",
  margin: "8px 0",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontSize: "14px",
  outline: "none",
  transition: "0.2s",
};


  return (
   <form 
  onSubmit={handleSubmit} 
  style={{
    maxWidth: "400px",
    margin: "50px auto",
    padding: "30px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif"
  }}
>
  <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>Sign Up</h2>
  
  <input 
    name="name" 
    placeholder="Name" 
    onChange={handleChange}
    style={inputStyle} 
  />
  <input 
    name="age" 
    placeholder="Age" 
    onChange={handleChange}
    style={inputStyle} 
  />
  <input 
    name="username" 
    placeholder="Username" 
    onChange={handleChange}
    style={inputStyle} 
  />
  <input 
    name="mobile" 
    placeholder="Mobile" 
    onChange={handleChange}
    style={inputStyle} 
  />
  <input 
    name="email" 
    placeholder="Email" 
    onChange={handleChange}
    style={inputStyle} 
  />
  <input 
    name="password" 
    placeholder="Password" 
    type="password" 
    onChange={handleChange}
    style={inputStyle} 
  />

  <button 
    type="submit" 
    style={{
      width: "100%",
      padding: "12px",
      backgroundColor: "#4f46e5",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      marginTop: "10px",
      transition: "0.3s"
    }}
    onMouseOver={(e) => e.target.style.backgroundColor = "#4338ca"}
    onMouseOut={(e) => e.target.style.backgroundColor = "#4f46e5"}
  >
    Sign Up
  </button>
</form>

  );
}
