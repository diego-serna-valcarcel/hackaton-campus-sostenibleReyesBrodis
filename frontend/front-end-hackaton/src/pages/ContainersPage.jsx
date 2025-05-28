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
    const [centro, setCentro] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [containersData, setContainersData] = useState([]);
    const [filteredContainers, setFilteredContainers] = useState([]);
    const [showOver75, setShowOver75] = useState(false);
    const [tipo, setTipo] = useState("");

  // Para histórico
  const [historyId, setHistoryId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [historyResults, setHistoryResults] = useState([]);

  const handleFilterByUbicacion = async (e) => {
    e.preventDefault();
    setShowOver75(false);

    if (!centro) {
      setFilteredContainers([]);
      return;
    }

    let url = "";
    if (ubicacion && tipo) {
      url = `http://localhost:8080/contenedores/search?center=${encodeURIComponent(centro)}&location=${encodeURIComponent(ubicacion)}&type=${encodeURIComponent(tipo)}`;
    } else if (ubicacion) {
      url = `http://localhost:8080/contenedores/search?center=${encodeURIComponent(centro)}&location=${encodeURIComponent(ubicacion)}`;
    } else if (tipo) {
      url = `http://localhost:8080/contenedores/search?center=${encodeURIComponent(centro)}&type=${encodeURIComponent(tipo)}`;
    } else {
      url = `http://localhost:8080/contenedores/center/${encodeURIComponent(centro)}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      setContainersData(data);
      setFilteredContainers(data);
    } catch (err) {
      setContainersData([]);
      setFilteredContainers([]);
    }
  };


  const handleShowOver75 = () => {
    setShowOver75(true);
    const filtered = (filteredContainers.length > 0 ? filteredContainers : containersData).filter((c) => c.capacidad > 75);
    setFilteredContainers(filtered);
  };

  // Buscar histórico
  const handleHistorySearch = async (e) => {
    e.preventDefault();
    if (!historyId || !startDate || !endDate) {
      setHistoryResults([]);
      return;
    }
  
    try {
      const res = await fetch("https://hackaton-campus-sostenible-api.mmartinez-d6a.workers.dev/containers/measurements");
      const data = await res.json();
  
      // Busca el contenedor por ID
      const contenedor = data.find((c) => c.id === historyId || c.id === Number(historyId));
      if (!contenedor) {
        setHistoryResults([]);
        return;
      }
  
      // Filtra el histórico por rango de fechas
      const start = new Date(startDate);
      const end = new Date(endDate);
  
      const filteredHistory = contenedor.history.filter((h) => {
        const fecha = new Date(h.timestamp);
        return fecha >= start && fecha <= end;
      });
  
      // Opcional: ordenar por fecha
      filteredHistory.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  
      setHistoryResults(filteredHistory);
    } catch (err) {
      setHistoryResults([]);
    }
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
                placeholder="Centro"
                value={centro}
                onChange={(e) => setCentro(e.target.value)}
                style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc", marginRight: 8 }}
                required
            />
            <input
                type="text"
                placeholder="Buscar por ubicación"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc", marginRight: 8 }}
            />
            <input
                type="text"
                placeholder="Tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
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
                <th style={{ border: "1px solid #ccc", padding: 8 }}>Centro</th>
                <th style={{ border: "1px solid #ccc", padding: 8 }}>Localización</th>
                <th style={{ border: "1px solid #ccc", padding: 8 }}>Tipo</th>
                <th style={{ border: "1px solid #ccc", padding: 8 }}>Latitud</th>
                <th style={{ border: "1px solid #ccc", padding: 8 }}>Longitud</th>
                <th style={{ border: "1px solid #ccc", padding: 8 }}>Capacidad</th>
                </tr>
            </thead>
            <tbody>
                {(filteredContainers.length > 0 ? filteredContainers : containersData).map((c) => (
                <tr key={c.id}>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>{c.id}</td>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>{c.center}</td>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>{c.location}</td>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>{c.type}</td>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>{c.latitude}</td>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>{c.longitude}</td>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>{c.capacity} {c.unit}</td>
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
          <td style={{ border: "1px solid #ccc", padding: 8 }}>{h.timestamp}</td>
          <td style={{ border: "1px solid #ccc", padding: 8 }}>{h.levelPercent}%</td>
        </tr>
      ))}
    </tbody>
  </table>
)}
        </div>
        </div>
    </>
  );
};

export default ContainersPage;
