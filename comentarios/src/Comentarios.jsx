// Punto 4: Consumir https://jsonplaceholder.typicode.com/comments (10 primeros) en React
// Uso: en un proyecto creado con `npm create vite@latest` (plantilla React),
// copia este archivo en src/ y en App.jsx pon: import Comentarios from "./Comentarios";
import { useEffect, useState } from "react";

export default function Comentarios() {
  const [comentarios, setComentarios] = useState([]); // empieza vacío
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null); // null = "no hay error"

  useEffect(() => {
    const obtenerComentarios = async () => {
      try {
        // _limit=10 pide solo los 10 primeros al servidor
        const respuesta = await fetch(
          "https://jsonplaceholder.typicode.com/comments?_limit=10"
        );
        if (!respuesta.ok) {
          throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        setComentarios(datos.slice(0, 10)); // asegura máximo 10
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };
    obtenerComentarios();
  }, []); // [] = se ejecuta una sola vez al montar el componente

  if (cargando) return <p>Cargando comentarios...</p>;
  if (error) return <p style={{ color: "red" }}>Ocurrió un error: {error}</p>;
  if (comentarios.length === 0) return <p>No hay comentarios.</p>;

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", fontFamily: "sans-serif" }}>
      <h1>Primeros 10 comentarios</h1>
      {comentarios.map((c) => (
        <div
          key={c.id}
          style={{ border: "1px solid #ccc", borderRadius: 8, padding: 12, marginBottom: 10 }}
        >
          <h3>#{c.id} – {c.name}</h3>
          <small>{c.email}</small>
          <p>{c.body}</p>
        </div>
      ))}
    </div>
  );
}