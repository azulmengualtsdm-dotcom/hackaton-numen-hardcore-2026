import { useState, useEffect } from "react";

export const FlujoTrabajo = () => {
  const [envio, setEnvio] = useState(null);
  const [loading, setLoading] = useState(true);

  const pasosWorkflow = [
    { id: 1, name: "Solicitado", icon: "🟡", label: "Faltante en Tienda" },
    { id: 2, name: "Aprobado", icon: "🟠", label: "Gerencia Autorizó" },
    { id: 3, name: "Preparado", icon: "🔵", label: "Listo en Fábrica" },
    { id: 4, name: "En Camino", icon: "🚚", label: "Camión en Ruta" },
    { id: 5, name: "Aprobado Calidad", icon: "🟢", label: "Puesto en Venta" }
  ];

  useEffect(() => {
    fetch("http://localhost:3005/api/shipment/trace/1")
      .then((res) => res.json())
      .then((data) => {
        setEnvio(data);
        setLoading(false);
      })
      .catch(() => {
        // Plan B por si el backend está apagado en las primeras pruebas
        setEnvio({
          id: 1,
          requested_quantity: 150,
          store_branch: "Tienda Centro",
          state_shipment: "Solicitado", 
          urgency_stock: "Riesgo Crítico"
        });
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: "20px" }}>Cargando flujo de trabajo corporativo...</p>;

  const indiceActual = pasosWorkflow.findIndex(p => p.name === envio?.state_shipment);

  return (
    <div style={{ padding: "30px", fontFamily: "sans-serif", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "#fff", padding: "25px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
        
        <h2 style={{ color: "#2c3e50", margin: "0 0 10px 0" }}>🚚 Monitoreo del Flujo de Trabajo en Tiempo Real</h2>
        <p style={{ color: "#7f8c8d", margin: "0 0 25px 0" }}>Orden de Envío N° #{envio?.id} — Destino: <strong>{envio?.store_branch}</strong></p>

        {envio?.urgency_stock === "Riesgo Crítico" && (
          <div style={{ backgroundColor: "#ffebee", color: "#c62828", padding: "12px", borderRadius: "6px", marginBottom: "30px", fontWeight: "bold", borderLeft: "5px solid #e53935" }}>
            🚨 ALERTA: Esta sucursal reportó Riesgo Crítico de Stock. Prioridad Máxima de Despacho.
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", padding: "20px 0" }}>
          <div style={{ position: "absolute", top: "50%", left: "5%", right: "5%", height: "4px", backgroundColor: "#e0e0e0", zIndex: 1, transform: "translateY(-50%)" }}></div>
          
          {pasosWorkflow.map((paso, index) => {
            const estaEncendido = index <= indiceActual;

            return (
              <div key={paso.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 2, width: "18%" }}>
                <div style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  backgroundColor: estaEncendido ? "#2ecc71" : "#fff",
                  border: estaEncendido ? "2px solid #27ae60" : "2px solid #bdc3c7",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "20px",
                  boxShadow: estaEncendido ? "0 0 15px rgba(46, 204, 113, 0.4)" : "none",
                  transition: "all 0.4s ease"
                }}>
                  {paso.icon}
                </div>
                <span style={{ fontSize: "13px", fontWeight: estaEncendido ? "bold" : "normal", color: estaEncendido ? "#2c3e50" : "#95a5a6", marginTop: "10px", textAlign: "center" }}>
                  {paso.label}
                </span>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: "40px", padding: "15px", backgroundColor: "#fdfefe", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
          <h4 style={{ margin: "0 0 10px 0", color: "#34495e" }}>📋 Resumen Logístico de la Carga</h4>
          <p style={{ margin: "5px 0", fontSize: "14px" }}>• <strong>Cantidad Solicitada:</strong> {envio?.requested_quantity} unidades.</p>
          <p style={{ margin: "5px 0", fontSize: "14px" }}>• <strong>Estado Actual en Ruta:</strong> <span style={{ backgroundColor: "#e8f5e9", color: "#2e7d32", padding: "3px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold" }}>{envio?.state_shipment}</span></p>
        </div>

      </div>
    </div>
  );
};

