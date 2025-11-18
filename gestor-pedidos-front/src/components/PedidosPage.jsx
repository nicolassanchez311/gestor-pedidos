import { useEffect, useState } from "react";
import {
  getPedidos,
  getClientes,
  getProductos,
  crearPedido,
  agregarItem,
  quitarItem,
  eliminarPedido,
} from "../api";

function PedidosPage() {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);

  const [idClienteSeleccionado, setIdClienteSeleccionado] = useState("");

  const [pedidoSeleccionadoId, setPedidoSeleccionadoId] = useState("");

  const [itemForm, setItemForm] = useState({
    idProducto: "",
    cantidad: 1,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [itemEditando, setItemEditando] = useState(null);
  const [editItemForm, setEditItemForm] = useState({
    idProducto: "",
    cantidad: 1,
  });

  // CARGA INICIAL 
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

      setPedidos(resPedidos.data);
      setClientes(resClientes.data);
      setProductos(resProductos.data);
    } catch (e) {
      console.error(e);
      setError("No se pudieron cargar pedidos, clientes o productos");
    } finally {
      setLoading(false);
    }
  };

  // CREAR PEDIDO 
  const handleCrearPedido = async (e) => {
    e.preventDefault();
    if (!idClienteSeleccionado) return;

    try {
      setError(null);
      await crearPedido(Number(idClienteSeleccionado));
      setIdClienteSeleccionado("");
      await cargarDatos();
    } catch (e) {
      console.error(e);
      setError("No se pudo crear el pedido");
    }
  };

  // AGREGAR ITEM 
  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setItemForm((prev) => ({
      ...prev,
      [name]: name === "cantidad" ? Number(value) : value,
    }));
  };

  const handleAgregarItem = async (e) => {
    e.preventDefault();
    if (!pedidoSeleccionadoId) {
      setError("Primero seleccioná un pedido");
      return;
    }
    if (!itemForm.idProducto || itemForm.cantidad < 1) return;

    try {
      setError(null);

      await agregarItem(Number(pedidoSeleccionadoId), {
        idProducto: Number(itemForm.idProducto),
        cantidad: itemForm.cantidad,
      });

     
      setItemForm({
        idProducto: "",
        cantidad: 1,
      });

      await cargarDatos();
    } catch (e) {
      console.error(e);
     
      setError("No se pudo agregar el item (revisá estado del pedido)");
    }
  };

  //  QUITAR ITEM 
  const handleQuitarItem = async (idProducto) => {
    if (!pedidoSeleccionadoId) return;
    try {
      setError(null);
      await quitarItem(Number(pedidoSeleccionadoId), idProducto);
      await cargarDatos();
    } catch (e) {
      console.error(e);
      setError("No se pudo quitar el item");
    }
  };

  //EDITAR ITEM 
  const handleEditItemClick = (item) => {
    setItemEditando(item);
    setEditItemForm({
      idProducto: item.producto?.id ?? "",
      cantidad: item.cantidad,
    });
  };

  const handleEditItemChange = (e) => {
    const { name, value } = e.target;
    setEditItemForm((prev) => ({
      ...prev,
      [name]: name === "cantidad" ? Number(value) : value,
    }));
  };

  const handleEditItemSubmit = async (e) => {
    e.preventDefault();
    if (!pedidoSeleccionadoId || !itemEditando) return;

    try {
      setError(null);

      
      await quitarItem(
        Number(pedidoSeleccionadoId),
        itemEditando.producto?.id
      );

      
      await agregarItem(Number(pedidoSeleccionadoId), {
        idProducto: Number(editItemForm.idProducto),
        cantidad: editItemForm.cantidad,
      });

      
      setItemEditando(null);
      setEditItemForm({
        idProducto: "",
        cantidad: 1,
      });

      await cargarDatos();
    } catch (e) {
      console.error(e);
      setError("No se pudo actualizar el item del pedido");
    }
  };

  const handleCancelarEdicionItem = () => {
    setItemEditando(null);
    setEditItemForm({
      idProducto: "",
      cantidad: 1,
    });
  };

  // ELIMINAR PEDIDO 
  const handleEliminarPedido = async () => {
    if (!pedidoSeleccionadoId) {
      setError("Primero seleccioná un pedido");
      return;
    }

    const confirmar = window.confirm(
      "¿Seguro que querés eliminar este pedido?"
    );
    if (!confirmar) return;

    try {
      setError(null);
      await eliminarPedido(Number(pedidoSeleccionadoId));

      
      setPedidoSeleccionadoId("");
      setItemForm({ idProducto: "", cantidad: 1 });
      setItemEditando?.(null); 

      await cargarDatos();
    } catch (e) {
      console.error(e);
      setError("No se pudo eliminar el pedido");
    }
  };

  //  CAMBIAR ESTADO PEDIDO 
  const handleCambiarEstado = async (nuevoEstado) => {
    if (!pedidoSeleccionadoId) return;

    try {
      setError(null);

      await fetch(
        `http://localhost:8080/pedidos/${pedidoSeleccionadoId}/estado`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nuevoEstado }),
        }
      );

      await cargarDatos();
    } catch (e) {
      console.error(e);
      setError("No se pudo cambiar el estado del pedido");
    }
  };

  //  HELPERS 
  const pedidoSeleccionado = pedidos.find(
    (p) => p.id === Number(pedidoSeleccionadoId)
  );

  const calcularTotal = (pedido) => {
    if (!pedido || !pedido.items) return 0;
    return pedido.items.reduce((acc, item) => {
      const linea = Number(item.precioUnitario) * item.cantidad;
      return acc + linea;
    }, 0);
  };

  const getEstadoStyle = (estado) => {
   
    switch (estado) {
      case "PENDIENTE":
        return {
          backgroundColor: "#fff3cd",
          color: "#856404",
          padding: "3px 8px",
          borderRadius: "12px",
          fontSize: "0.85rem",
        };
      case "CONFIRMADO":
        return {
          backgroundColor: "#cce5ff",
          color: "#004085",
          padding: "3px 8px",
          borderRadius: "12px",
          fontSize: "0.85rem",
        };
      case "ENVIADO":
        return {
          backgroundColor: "#d6d8ff",
          color: "#383d7c",
          padding: "3px 8px",
          borderRadius: "12px",
          fontSize: "0.85rem",
        };
      case "ENTREGADO":
        return {
          backgroundColor: "#d4edda",
          color: "#155724",
          padding: "3px 8px",
          borderRadius: "12px",
          fontSize: "0.85rem",
        };
      case "CANCELADO":
        return {
          backgroundColor: "#f8d7da",
          color: "#721c24",
          padding: "3px 8px",
          borderRadius: "12px",
          fontSize: "0.85rem",
        };
      default:
        return {};
    }
  };

  //  RENDER 
  return (
    <div className="container my-4" style={{ maxWidth: 1000 }}>
      <h2 className="mb-4">Pedidos</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {loading && (
        <div className="alert alert-info" role="status">
          Cargando...
        </div>
      )}

      {/*  Crear pedido */}
      <div className="card mb-4">
        <div className="card-header">Nuevo pedido</div>
        <div className="card-body">
          <form
            onSubmit={handleCrearPedido}
            className="row g-2 align-items-end"
          >
            <div className="col-md-8">
              <label className="form-label">Cliente</label>
              <select
                className="form-select"
                value={idClienteSeleccionado}
                onChange={(e) => setIdClienteSeleccionado(e.target.value)}
                required
              >
                <option value="">-- Seleccionar cliente --</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre} ({c.email})
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4 d-grid">
              <button type="submit" className="btn btn-primary">
                Crear pedido
              </button>
            </div>
          </form>
        </div>
      </div>

      {/*  Listado de pedidos */}
      <div className="card mb-4">
        <div className="card-header">Listado de pedidos</div>
        <div className="card-body p-0">
          {pedidos.length === 0 ? (
            <p className="m-3">No hay pedidos cargados.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-sm mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Seleccionar</th>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Items</th>
                    <th>Total estimado</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.map((p) => (
                    <tr key={p.id}>
                      <td className="text-center">
                        <input
                          type="radio"
                          name="pedidoSeleccionado"
                          checked={pedidoSeleccionadoId === String(p.id)}
                          onChange={() =>
                            setPedidoSeleccionadoId(String(p.id))
                          }
                        />
                      </td>
                      <td>{p.id}</td>
                      <td>{p.cliente?.nombre}</td>
                      <td>
                        {p.fechaCreacion
                          ? new Date(p.fechaCreacion).toLocaleString()
                          : ""}
                      </td>
                      <td>
                        <span style={getEstadoStyle(p.estado)}>
                          {p.estado}
                        </span>
                      </td>
                      <td>{p.items ? p.items.length : 0}</td>
                      <td>${calcularTotal(p).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detalle del pedido seleccionado  */}
      <div className="card">
        <div className="card-header">Detalle del pedido seleccionado</div>
        <div className="card-body">
          {!pedidoSeleccionado ? (
            <p>Elegí un pedido de la tabla para ver y cargar items.</p>
          ) : (
            <>
              <p>
                <strong>Pedido #{pedidoSeleccionado.id}</strong> – Cliente:{" "}
                {pedidoSeleccionado.cliente?.nombre} – Estado:{" "}
                <span style={getEstadoStyle(pedidoSeleccionado.estado)}>
                  {pedidoSeleccionado.estado}
                </span>
              </p>

              {/* Botones cambio de estado */}
              <div className="mb-3">
                <strong>Cambiar estado:</strong>
                <div className="btn-group flex-wrap mt-2" role="group">
                  {[
                    "PENDIENTE",
                    "CONFIRMADO",
                    "ENVIADO",
                    "ENTREGADO",
                    "CANCELADO",
                  ].map((estado) => (
                    <button
                      key={estado}
                      type="button"
                      onClick={() => handleCambiarEstado(estado)}
                      disabled={pedidoSeleccionado.estado === estado}
                      className={`btn btn-sm ${
                        pedidoSeleccionado.estado === estado
                          ? "btn-secondary"
                          : "btn-outline-secondary"
                      }`}
                    >
                      {estado}
                    </button>
                  ))}
                </div>
              </div>

              {/* Items del pedido */}
              <h4>Items</h4>
              {(!pedidoSeleccionado.items ||
                pedidoSeleccionado.items.length === 0) && (
                <p>Este pedido todavía no tiene productos.</p>
              )}

              {pedidoSeleccionado.items &&
                pedidoSeleccionado.items.length > 0 && (
                  <div className="table-responsive mb-3">
                    <table className="table table-sm align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Producto</th>
                          <th>Precio unitario</th>
                          <th>Cantidad</th>
                          <th>Subtotal</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pedidoSeleccionado.items.map((item) => (
                          <tr key={item.id}>
                            <td>{item.producto?.nombre}</td>
                            <td>{item.precioUnitario}</td>
                            <td>{item.cantidad}</td>
                            <td>
                              {(
                                Number(item.precioUnitario) * item.cantidad
                              ).toFixed(2)}
                            </td>
                            <td>
                              <div className="btn-group btn-group-sm">
                                <button
                                  type="button"
                                  onClick={() => handleEditItemClick(item)}
                                  className="btn btn-outline-primary"
                                  disabled={
                                    pedidoSeleccionado.estado !== "PENDIENTE"
                                  }
                                >
                                  Editar
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleQuitarItem(item.producto?.id)
                                  }
                                  className="btn btn-outline-danger"
                                  disabled={
                                    pedidoSeleccionado.estado !== "PENDIENTE"
                                  }
                                >
                                  Quitar
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

              {itemEditando && pedidoSeleccionado.estado === "PENDIENTE" && (
                <div className="border rounded p-3 mb-3">
                  <h5>Editar item</h5>
                  <p className="mb-2">
                    Editando item de:{" "}
                    <strong>{itemEditando.producto?.nombre}</strong>
                  </p>

                  <form onSubmit={handleEditItemSubmit} className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">
                        Producto
                        <select
                          name="idProducto"
                          value={editItemForm.idProducto}
                          onChange={handleEditItemChange}
                          required
                          className="form-select"
                        >
                          <option value="">
                            -- Seleccionar producto --
                          </option>
                          {productos.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.nombre} (${p.precioBase})
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">
                        Cantidad
                        <input
                          type="number"
                          name="cantidad"
                          min="1"
                          value={editItemForm.cantidad}
                          onChange={handleEditItemChange}
                          required
                          className="form-control"
                        />
                      </label>
                    </div>

                    <div className="col-md-3 d-flex align-items-end gap-2">
                      <button type="submit" className="btn btn-success">
                        Guardar cambios
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelarEdicionItem}
                        className="btn btn-outline-secondary"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <p className="fs-5">
                <strong>Total:</strong>{" "}
                ${calcularTotal(pedidoSeleccionado).toFixed(2)}
              </p>

              {/* Botón para eliminar pedido */}
              <button
                type="button"
                onClick={handleEliminarPedido}
                disabled={pedidoSeleccionado.estado !== "PENDIENTE"}
                className="btn btn-outline-danger"
              >
                Eliminar pedido
              </button>

              {/* Form para agregar item */}
              {pedidoSeleccionado.estado !== "PENDIENTE" ? (
                <p className="text-muted mt-3">
                  No se pueden modificar pedidos en estado{" "}
                  {pedidoSeleccionado.estado}.
                </p>
              ) : (
                <>
                  <hr />
                  <h4>Agregar producto al pedido</h4>
                  <form
                    onSubmit={handleAgregarItem}
                    className="row g-3 align-items-end"
                  >
                    <div className="col-md-6">
                      <label className="form-label">
                        Producto
                        <select
                          name="idProducto"
                          value={itemForm.idProducto}
                          onChange={handleItemChange}
                          required
                          className="form-select"
                        >
                          <option value="">
                            -- Seleccionar producto --
                          </option>
                          {productos.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.nombre} (${p.precioBase})
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">
                        Cantidad
                        <input
                          type="number"
                          name="cantidad"
                          min="1"
                          value={itemForm.cantidad}
                          onChange={handleItemChange}
                          required
                          className="form-control"
                        />
                      </label>
                    </div>

                    <div className="col-md-3 d-grid">
                      <button type="submit" className="btn btn-primary">
                        Agregar item
                      </button>
                    </div>
                  </form>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PedidosPage;


