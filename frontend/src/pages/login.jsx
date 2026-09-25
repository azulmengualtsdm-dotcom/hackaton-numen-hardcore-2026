import { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      const res = await fetch("http://localhost:3005/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const datos = await res.json();

      if (res.ok) {
        setMensaje("¡Inicio de sesión exitoso! Redirigiendo...");
        localStorage.setItem("userRole", datos.role);
        
        setTimeout(() => {
          window.location.href = "/workflow";
        }, 1500);
      } else {
        setError(datos.error || "Credenciales incorrectas corporativas.");
      }
    } catch {
      setError("Error crítico: No se pudo conectar con el servidor central.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f3f4f6", fontFamily: "sans-serif" }}>
      <div style={{ backgroundColor: "#ffffff", padding: "40px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", width: "100%", maxWidth: "400px" }}>
        
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h2 style={{ color: "#1f2937", margin: "0 0 10px 0" }}>Portal Corporativo</h2>
          <p style={{ color: "#6b7280", fontSize: "14px", margin: "0" }}>Inicie sesión para gestionar el Flujo de Trabajo</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "5px" }}>Correo Electrónico</label>
            <input 
              type="email" 
              placeholder="nombre@comercio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "93%", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "15px" }}
              required 
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "5px" }}>Contraseña</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "93%", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "15px" }}
              required 
            />
          </div>

          <button type="submit" style={{ width: "100%", backgroundColor: "#2563eb", color: "#ffffff", padding: "12px", borderRadius: "6px", border: "none", fontSize: "16px", fontWeight: "600", cursor: "pointer" }}>
            Ingresar al Sistema
          </button>
        </form>

        {mensaje && <p style={{ color: "#16a34a", textAlign: "center", marginTop: "20px", fontWeight: "bold" }}>{mensaje}</p>}
        {error && <p style={{ color: "#dc2626", textAlign: "center", marginTop: "20px", fontWeight: "bold" }}>{error}</p>}

      </div>
    </div>
  );
};
