import React from "react";
import { Boton } from "../componentes/Boton";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bienvenido al Campus Sostenible</h1>
      <div style={{ margin: "20px" }}>
        <Boton texto="Iniciar Sesión" onClick={() => navigate("/login")} />
      </div>
      <div style={{ margin: "20px" }}>
        <Boton texto="Contenedores" onClick={() => navigate("/containers")} />
      </div>
      <div style={{ margin: "20px" }}>
        <Boton texto="Iniciar Sesión" onClick={() => navigate("/login")} />
      </div>
    </div>
  );
};

export default HomePage;