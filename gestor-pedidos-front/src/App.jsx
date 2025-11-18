import { useState } from "react";
import ProductosPage from "./components/ProductosPage";
import ClientesPage from "./components/ClientesPage";
import PedidosPage from "./components/PedidosPage";
import DashboardPage from "./components/DashboardPage";

function App() {
  const [tab, setTab] = useState("dashboard"); 
  // 'dashboard' | 'productos' | 'clientes' | 'pedidos'

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Gestor de Pedidos</h1>

      {/* Menú con Bootstrap nav-tabs */}
      <ul className="nav nav-tabs justify-content-center mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${tab === "dashboard" ? "active" : ""}`}
            type="button"
            onClick={() => setTab("dashboard")}
          >
            Dashboard
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${tab === "productos" ? "active" : ""}`}
            type="button"
            onClick={() => setTab("productos")}
          >
            Productos
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${tab === "clientes" ? "active" : ""}`}
            type="button"
            onClick={() => setTab("clientes")}
          >
            Clientes
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${tab === "pedidos" ? "active" : ""}`}
            type="button"
            onClick={() => setTab("pedidos")}
          >
            Pedidos
          </button>
        </li>
      </ul>

      {/* Contenido según la pestaña */}
      {tab === "dashboard" && <DashboardPage onCambiarTab={setTab} />}
      {tab === "productos" && <ProductosPage />}
      {tab === "clientes" && <ClientesPage />}
      {tab === "pedidos" && <PedidosPage />}
    </div>
  );
}

export default App;




