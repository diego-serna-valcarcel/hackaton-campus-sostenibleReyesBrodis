import React, { useState } from "react";
import { Boton } from "../componentes/Boton";
import Header from "../componentes/Header";

// Ejemplo de datos de contenedores (puedes reemplazarlo por datos reales o fetch)
const containersData = [
  {
    id: 1,
    ubicacion: "Edificio A",
    tipo: "Plástico",
    capacidad: 80,
    ultimaActualizacion: "2024-05-28 10:00",
  },
  {
    id: 2,
    ubicacion: "Edificio B",
    tipo: "Papel",
    capacidad: 60,
    ultimaActualizacion: "2024-05-28 09:30",
  },
  {
    id: 3,
    ubicacion: "Edificio C",
    tipo: "Orgánico",
    capacidad: 90,
    ultimaActualizacion: "2024-05-28 11:00",
  },
];

// Ejemplo de histórico (en un caso real, esto vendría de una API)
const containersHistory = [
  // id, fechaHora, capacidad
  { id: 1, fechaHora: "2024-05-28 09:00", capacidad: 70 },
  { id: 1, fechaHora: "2024-05-28 10:00", capacidad: 80 },
  { id: 1, fechaHora: "2024-05-28 11:00", capacidad: 85 },
  { id: 2, fechaHora: "2024-05-28 09:00", capacidad: 55 },
  { id: 2, fechaHora: "2024-05-28 10:00", capacidad: 60 },
  { id: 3, fechaHora: "2024-05-28 10:00", capacidad: 90 },
  { id: 3, fechaHora: "2024-05-28 11:00", capacidad: 92 },
];

const ContainersPage = () => {
  const [ubicacion, setUbicacion] = useState("");
  const [filteredContainers, setFilteredContainers] = useState([]);
  const [showOver75, setShowOver75] = useState(false);

  // Para histórico
  const [historyId, setHistoryId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [historyResults, setHistoryResults] = useState([]);

  // Filtrar por ubicación
  const handleFilterByUbicacion = (e) => {
    e.preventDefault();
    setShowOver75(false);
    const filtered = containersData.filter((c) =>
      c.ubicacion.toLowerCase().includes(ubicacion.toLowerCase())
    );
    setFilteredContainers(filtered);
  };

  // Mostrar contenedores con capacidad > 75%
  const handleShowOver75 = () => {
    setShowOver75(true);
    const filtered = containersData.filter((c) => c.capacidad > 75);
    setFilteredContainers(filtered);
  };

  // Buscar histórico
  const handleHistorySearch = (e) => {
    e.preventDefault();
    if (!historyId || !startDate || !endDate) {
      setHistoryResults([]);
      return;
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    const filtered = containersHistory.filter(
      (h) =>
        h.id === Number(historyId) &&
        new Date(h.fechaHora) >= start &&
        new Date(h.fechaHora) <= end
    );
    setHistoryResults(filtered);
  };

  return (
    <>
        <Header />
        <div style={{ maxWidth: 900, margin: "40px auto", padding: 24 }}>
        <h2 style={{ textAlign: "center" }}>Contenedores</h2>

        {/* Filtro por ubicación */}
        <form onSubmit={handleFilterByUbicacion} style={{ marginBottom: 24, textAlign: "center" }}>
            <input
            type="text"
            placeholder="Buscar por ubicación"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc", marginRight: 8 }}
            />
            <Boton texto="Buscar" />
        </form>

        {/* Botón para mostrar contenedores con capacidad > 75% */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
            <Boton texto="Mostrar contenedores > 75%" onClick={handleShowOver75} />
        </div>

        {/* Tabla de contenedores */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 32 }}>
            <thead>
            <tr>
                <th style={{ border: "1px solid #ccc", padding: 8 }}>ID</th>
                <th style={{ border: "1px solid #ccc", padding: 8 }}>Ubicación</th>
                <th style={{ border: "1px solid #ccc", padding: 8 }}>Tipo</th>
                <th style={{ border: "1px solid #ccc", padding: 8 }}>Capacidad (%)</th>
                <th style={{ border: "1px solid #ccc", padding: 8 }}>Última actualización</th>
            </tr>
            </thead>
            <tbody>
            {(filteredContainers.length > 0 ? filteredContainers : containersData).map((c) => (
                <tr key={c.id}>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>{c.id}</td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>{c.ubicacion}</td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>{c.tipo}</td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>{c.capacidad}%</td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>{c.ultimaActualizacion}</td>
                </tr>
            ))}
            </tbody>
        </table>

        {/* Histórico de capacidad */}
        <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 16, marginTop: 32 }}>
            <h3>Histórico de capacidad de un contenedor</h3>
            <form onSubmit={handleHistorySearch} style={{ marginBottom: 16 }}>
            <input
                type="number"
                placeholder="ID del contenedor"
                value={historyId}
                onChange={(e) => setHistoryId(e.target.value)}
                style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc", marginRight: 8, width: 150 }}
            />
            <input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc", marginRight: 8 }}
            />
            <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc", marginRight: 8 }}
            />
            <Boton texto="Buscar histórico" />
            </form>
            {historyResults.length > 0 && (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th style={{ border: "1px solid #ccc", padding: 8 }}>Fecha y hora</th>
                    <th style={{ border: "1px solid #ccc", padding: 8 }}>Capacidad (%)</th>
                </tr>
                </thead>
                <tbody>
                {historyResults.map((h, idx) => (
                    <tr key={idx}>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>{h.fechaHora}</td>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>{h.capacidad}%</td>
                    </tr>
                ))}
                </tbody>
            </table>
            )}
            {historyResults.length === 0 && (
            <div style={{ color: "#888", textAlign: "center", marginTop: 12 }}>
                No hay datos para los filtros seleccionados.
            </div>
            )}
        </div>
        </div>
    </>
  );
};

export default ContainersPage;