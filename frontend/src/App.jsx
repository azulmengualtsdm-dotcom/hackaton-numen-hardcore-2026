import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/login.jsx";
import { FlujoTrabajo } from "./pages/flujotrabajo.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔑 URL Pública: Formulario de ingreso */}
        <Route path="/login" element={<Login />} />

        {/* 🚚 URL Privada: El Flujo de Trabajo con los foquitos correlativos */}
        <Route path="/workflow" element={<FlujoTrabajo />} />

        {/* 🔄 Redirección automática si escriben cualquier cosa en la barra */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
