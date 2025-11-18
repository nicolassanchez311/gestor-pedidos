import { useEffect, useState } from "react";
import {
  getProductos,
  crearProducto,
  eliminarProducto,
  actualizarProducto,
} from "../api";

function ProductosPage() {
  const [productos, setProductos] = useState([]);

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precioBase: "",
    moneda: "ARS",
    activo: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getProductos();
      setProductos(res.data);
    } catch (e) {
      console.error(e);
      setError("No se pudieron cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setForm({
      nombre: "",
      descripcion: "",
      precioBase: "",
      moneda: "ARS",
      activo: true,
    });
    setModoEdicion(false);
    setIdEditando(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);

      const payload = {
        ...form,
        precioBase: parseFloat(form.precioBase),
      };

      if (modoEdicion && idEditando != null) {
        // EDITAR
        await actualizarProducto(idEditando, payload);
      } else {
        // CREAR
        await crearProducto(payload);
      }

      resetForm();
      await cargarProductos();
    } catch (e) {
      console.error(e);
      setError(
        modoEdicion
          ? "No se pudo actualizar el producto"
          : "No se pudo crear el producto"
      );
    }
  };

  const handleEditar = (prod) => {
    setModoEdicion(true);
    setIdEditando(prod.id);
    setForm({
      nombre: prod.nombre ?? "",
      descripcion: prod.descripcion ?? "",
      precioBase: prod.precioBase ?? "",
      moneda: prod.moneda ?? "ARS",
      activo: prod.activo ?? true,
    });
  };

  const handleCancelarEdicion = () => {
    resetForm();
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm(
      "¿Seguro que querés eliminar este producto?"
    );
    if (!confirmar) return;

    try {
      setError(null);
      await eliminarProducto(id);
      await cargarProductos();
    } catch (e) {
      console.error(e);
      setError(
        "No se pudo eliminar el producto. Es posible que esté asociado a pedidos."
      );
    }
  };

  return (
    <div className="container my-4" style={{ maxWidth: 900 }}>
      <h2 className="mb-4">Productos</h2>

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

      {/*  Formulario  */}
      <div className="card mb-4">
        <div className="card-header">
          {modoEdicion ? "Editar producto" : "Nuevo producto"}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">
                Nombre
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </label>
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Descripción
                <input
                  type="text"
                  name="descripcion"
                  value={form.descripcion}
                  onChange={handleChange}
                  className="form-control"
                />
              </label>
            </div>

            <div className="col-md-4">
              <label className="form-label">
                Precio base
                <input
                  type="number"
                  step="0.01"
                  name="precioBase"
                  value={form.precioBase}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </label>
            </div>

            <div className="col-md-4">
              <label className="form-label">
                Moneda
                <input
                  type="text"
                  name="moneda"
                  value={form.moneda}
                  onChange={handleChange}
                  className="form-control"
                />
              </label>
            </div>

            <div className="col-md-4 d-flex align-items-center">
              <div className="form-check mt-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="activo"
                  id="activoCheck"
                  checked={form.activo}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="activoCheck">
                  Activo
                </label>
              </div>
            </div>

            <div className="col-12 d-flex gap-2">
              <button type="submit" className="btn btn-primary">
                {modoEdicion ? "Guardar cambios" : "Guardar producto"}
              </button>

              {modoEdicion && (
                <button
                  type="button"
                  onClick={handleCancelarEdicion}
                  className="btn btn-outline-secondary"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Listado  */}
      <div className="card">
        <div className="card-header">Listado de productos</div>
        <div className="card-body p-0">
          {productos.length === 0 ? (
            <p className="m-3">No hay productos cargados.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-sm mb-0">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Moneda</th>
                    <th>Activo</th>
                    <th style={{ width: 140 }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.nombre}</td>
                      <td>{p.descripcion}</td>
                      <td>{p.precioBase}</td>
                      <td>{p.moneda}</td>
                      <td>
                        {p.activo ? (
                          <span className="badge bg-success">Sí</span>
                        ) : (
                          <span className="badge bg-secondary">No</span>
                        )}
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm" role="group">
                          <button
                            type="button"
                            onClick={() => handleEditar(p)}
                            className="btn btn-outline-primary"
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleEliminar(p.id)}
                            className="btn btn-outline-danger"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductosPage;

