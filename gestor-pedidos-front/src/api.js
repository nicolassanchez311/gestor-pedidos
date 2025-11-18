import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// === Productos ===
export const getProductos = () => api.get("/productos");

export const crearProducto = (producto) =>
  api.post("/productos", producto);

export const eliminarProducto = (id) => api.delete(`/productos/${id}`);

export const actualizarProducto = (id, data) => api.put(`/productos/${id}`, data);

// === Clientes ===
export const getClientes = () => api.get("api/clientes");

export const crearCliente = (cliente) =>
  api.post("api/clientes", cliente);

// (si después agregamos editar/borra)
export const actualizarCliente = (id, cliente) =>
  api.put(`api/clientes/${id}`, cliente);

export const eliminarCliente = (id) =>
  api.delete(`api/clientes/${id}`);

export const deleteCliente = (id) => api.delete(`api/clientes/${id}`);

//  Pedidos 
export const getPedidos = () => api.get("/pedidos");

export const crearPedido = (idCliente) =>
  api.post("/pedidos", { idCliente });

export const agregarItem = (idPedido, data) =>
  api.post(`/pedidos/${idPedido}/items`, data);

//   quitar item de un pedido
export const quitarItem = (idPedido, idProducto) =>
  api.delete(`/pedidos/${idPedido}/items/${idProducto}`);

export const eliminarPedido = (idPedido) =>
  api.delete(`/pedidos/${idPedido}`);

export default api;
