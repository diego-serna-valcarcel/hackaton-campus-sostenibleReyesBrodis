import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Boton } from "../componentes/Boton";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (pwd) => {
    return (
      pwd.length >= 8 &&
      /[A-Z]/.test(pwd) &&
      /[a-zA-Z]/.test(pwd) &&
      /\d/.test(pwd)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    if (password !== repeatPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (!validatePassword(password)) {
      setError(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una letra y un número."
      );
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usuario,
          email: email,
          password: password,
        }),
      });
  
      if (!response.ok) {
        throw new Error("No se pudo registrar el usuario.");
      }
  
      alert("Registro exitoso");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "60px auto", padding: 24, border: "1px solid #ddd", borderRadius: 8 }}>
      <h2 style={{ textAlign: "center" }}>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <input
            type="password"
            placeholder="Repetir contraseña"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
            style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
          />
        </div>
        {error && (
          <div style={{ color: "red", marginBottom: 16, textAlign: "center" }}>
            {error}
          </div>
        )}
        <Boton texto="Registrarse" type="submit" />
      </form>
    </div>
  );
};

export default SignUpPage;