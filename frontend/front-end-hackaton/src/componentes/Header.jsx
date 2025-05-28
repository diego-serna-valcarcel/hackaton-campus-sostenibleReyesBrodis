import React from "react";
import { useNavigate } from "react-router-dom";
import { Boton } from "./Boton";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        padding: "12px 24px",
        width: "100%",
        boxSizing: "border-box",
        background: "#f5f5f5",
        position: "sticky",
        top: 0,
        left: 0,
        zIndex: 100,
        minHeight: 56,
      }}
    >
      <Boton
        texto="Contenedores Sostenibles SL"
        onClick={() => navigate("/")}
      />
    </header>
  );
};

export default Header;