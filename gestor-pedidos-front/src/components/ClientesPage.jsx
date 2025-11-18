import { useEffect, useState } from "react";
import {
  getClientes,
  crearCliente,
  deleteCliente,
  actualizarCliente,
} from "../api";

function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    direccionEntrega: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getClientes();
      setClientes(res.data);
    } catch (e) {
      console.error(e);
      setError("No se pudieron cargar los clientes");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm({
      nombre: "",
      email: "",
      direccionEntrega: "",
    });
    setEditandoId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);

      if (editandoId == null) {
        //  CREAR 
        await crearCliente(form);
      } else {
        //  ACTUALIZAR 
        await actualizarCliente(editandoId, form);
      }

      resetForm();
      await cargarClientes();
    } catch (e) {
      console.error(e);
      setError(
        editandoId == null
          ? "No se pudo crear el cliente"
          : "No se pudo actualizar el cliente"
      );
    }
  };

  // ELIMINAR CLIENTE
  const handleEliminarCliente = async (id) => {
    const confirmado = window.confirm(
      "¿Seguro que querés eliminar este cliente?"
    );
    if (!confirmado) return;

    try {
      setError(null);
      await deleteCliente(id);
      // si estabas editando justo ese cliente, reseteamos
      if (editandoId === id) {
        resetForm();
      }
      await cargarClientes();
    } catch (e) {
      console.error(e);
      setError(
        "No se pudo eliminar el cliente. Es posible que tenga pedidos asociados."
      );
    }
  };

  //  EDITAR CLIENTE 
  const handleEditarCliente = (cliente) => {
    setEditandoId(cliente.id);
    setForm({
      nombre: cliente.nombre || "",
      email: cliente.email || "",
      direccionEntrega: cliente.direccionEntrega || "",
    });
  };

  const handleCancelarEdicion = () => {
    resetForm();
  };

  return (
    <div className="container my-4" style={{ maxWidth: 900 }}>
      <h2 className="mb-4">Clientes</h2>

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

      {/*  Formulario */}
      <div className="card mb-4">
        <div className="card-header">
          {editandoId == null
            ? "Nuevo cliente"
            : `Editar cliente #${editandoId}`}
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
                Email
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </label>
            </div>

            <div className="col-12">
              <label className="form-label">
                Dirección de entrega
                <input
                  type="text"
                  name="direccionEntrega"
                  value={form.direccionEntrega}
                  onChange={handleChange}
                  className="form-control"
                />
              </label>
            </div>

            <div className="col-12 d-flex gap-2">
              <button type="submit" className="btn btn-primary">
                {editandoId == null ? "Guardar cliente" : "Guardar cambios"}
              </button>

              {editandoId != null && (
                <button
                  type="button"
                  onClick={handleCancelarEdicion}
                  className="btn btn-outline-secondary"
                >
                  Cancelar edición
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/*  Listado  */}
      <div className="card">
        <div className="card-header">Listado de clientes</div>
        <div className="card-body p-0">
          {clientes.length === 0 ? (
            <p className="m-3">No hay clientes cargados.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-sm mb-0">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Dirección de entrega</th>
                    <th style={{ width: 150 }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map((c) => (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td>{c.nombre}</td>
                      <td>{c.email}</td>
                      <td>{c.direccionEntrega}</td>
                      <td>
                        <div className="btn-group btn-group-sm" role="group">
                          <button
                            type="button"
                            onClick={() => handleEditarCliente(c)}
                            className="btn btn-outline-primary"
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleEliminarCliente(c.id)}
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

export default ClientesPage;


