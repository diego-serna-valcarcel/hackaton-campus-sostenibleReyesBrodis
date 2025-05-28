import React, { useState } from "react";
import { Boton } from "../componentes/Boton";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: correo,         // antes estaba como email
          password: contrasena
        })
      });
  
      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }
  
      const data = await response.text(); // como devuelves un String, no JSON
  
      console.log(data); // "Login successful"
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ maxWidth: 350, margin: "60px auto", padding: 24, border: "1px solid #ddd", borderRadius: 8 }}>
      <h2 style={{ textAlign: "center" }}>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: 16 }}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: 12, textAlign: "right" }}>
          <button
            type="button"
            style={{ background: "none", border: "none", color: "#1976d2", cursor: "pointer", padding: 0 }}
            onClick={() => navigate("/recover-password")}
          >
            He olvidado mi contraseña
          </button>
        </div>
        <div style={{ marginBottom: 16 }}>
          <Boton texto="Iniciar Sesión" type="submit" />
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            type="button"
            style={{ background: "none", border: "none", color: "#1976d2", cursor: "pointer", padding: 0 }}
            onClick={() => navigate("/register")}
          >
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;