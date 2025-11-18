import { useEffect, useState } from "react";
import { getPedidos, getClientes, getProductos } from "../api";

function DashboardPage({ onCambiarTab }) {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      setError(null);

      const [resPedidos, resClientes, resProductos] = await Promise.all([
        getPedidos(),
        getClientes(),
        getProductos(),
      ]);

      setPedidos(resPedidos.data || []);
      setClientes(resClientes.data || []);
      setProductos(resProductos.data || []);
    } catch (e) {
      console.error(e);
      setError("No se pudieron cargar los datos del dashboard");
    } finally {
      setLoading(false);
    }
  };

  const totalPedidos = pedidos.length;
  const totalClientes = clientes.length;
  const totalProductos = productos.length;

  const contarPorEstado = (estado) =>
    pedidos.filter((p) => p.estado === estado).length;

  const pendientes = contarPorEstado("PENDIENTE");
  const confirmados = contarPorEstado("CONFIRMADO");
  const enviados = contarPorEstado("ENVIADO");
  const entregados = contarPorEstado("ENTREGADO");
  const cancelados = contarPorEstado("CANCELADO");

  const ultimosPedidos = [...pedidos]
    .sort((a, b) => (b.id ?? 0) - (a.id ?? 0))
    .slice(0, 5);

  const calcularTotal = (pedido) => {
    if (!pedido || !pedido.items) return 0;
    return pedido.items.reduce((acc, item) => {
      const linea = Number(item.precioUnitario) * item.cantidad;
      return acc + linea;
    }, 0);
  };

  return (
    <div className="container my-3" style={{ maxWidth: 1100 }}>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {loading && (
        <div className="alert alert-info" role="status">
          Cargando datos del dashboard...
        </div>
      )}

      
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card text-bg-primary h-100">
            <div className="card-body">
              <h5 className="card-title">Total de pedidos</h5>
              <p className="display-6 mb-0">{totalPedidos}</p>
            </div>
            <div className="card-footer text-end">
              <button
                className="btn btn-sm btn-light"
                type="button"
                onClick={() => onCambiarTab?.("pedidos")}
              >
                Ver pedidos
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-bg-success h-100">
            <div className="card-body">
              <h5 className="card-title">Clientes registrados</h5>
              <p className="display-6 mb-0">{totalClientes}</p>
            </div>
            <div className="card-footer text-end">
              <button
                className="btn btn-sm btn-light"
                type="button"
                onClick={() => onCambiarTab?.("clientes")}
              >
                Ver clientes
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-bg-warning h-100">
            <div className="card-body">
              <h5 className="card-title">Productos activos</h5>
              <p className="display-6 mb-0">{totalProductos}</p>
            </div>
            <div className="card-footer text-end">
              <button
                className="btn btn-sm btn-light"
                type="button"
                onClick={() => onCambiarTab?.("productos")}
              >
                Ver productos
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Estado de pedidos  */}
      <div className="row g-3 mb-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">Estado de los pedidos</div>
            <div className="card-body">
              {totalPedidos === 0 ? (
                <p className="mb-0">
                  Todavía no hay pedidos cargados en el sistema.
                </p>
              ) : (
                <div className="d-flex flex-wrap gap-2">
                  <span className="badge text-bg-secondary p-2">
                    Pendientes: <strong>{pendientes}</strong>
                  </span>
                  <span className="badge text-bg-info p-2">
                    Confirmados: <strong>{confirmados}</strong>
                  </span>
                  <span className="badge text-bg-primary p-2">
                    Enviados: <strong>{enviados}</strong>
                  </span>
                  <span className="badge text-bg-success p-2">
                    Entregados: <strong>{entregados}</strong>
                  </span>
                  <span className="badge text-bg-danger p-2">
                    Cancelados: <strong>{cancelados}</strong>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/*  Últimos pedidos  */}
      <div className="row g-3">
        <div className="col-md-8">
          <div className="card h-100">
            <div className="card-header">Últimos pedidos</div>
            <div className="card-body p-0">
              {ultimosPedidos.length === 0 ? (
                <p className="m-3">No hay pedidos para mostrar.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-sm mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ultimosPedidos.map((p) => (
                        <tr key={p.id}>
                          <td>{p.id}</td>
                          <td>{p.cliente?.nombre}</td>
                          <td>
                            {p.fechaCreacion
                              ? new Date(
                                  p.fechaCreacion
                                ).toLocaleString()
                              : ""}
                          </td>
                          <td>{p.estado}</td>
                          <td>${calcularTotal(p).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Accesos rápidos */}
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-header">Accesos rápidos</div>
            <div className="card-body d-flex flex-column gap-2">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => onCambiarTab?.("pedidos")}
              >
                🛒 Gestionar pedidos
              </button>
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={() => onCambiarTab?.("clientes")}
              >
                🧑‍🤝‍🧑 Gestionar clientes
              </button>
              <button
                type="button"
                className="btn btn-outline-warning"
                onClick={() => onCambiarTab?.("productos")}
              >
                📦 Gestionar productos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
