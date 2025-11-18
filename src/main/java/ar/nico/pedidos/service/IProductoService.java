package ar.nico.pedidos.service;

import ar.nico.pedidos.model.Producto;
import java.util.List;

public interface IProductoService {
    Producto crear(Producto p);
    Producto obtener(Long id);
    List<Producto> listar();
    List<Producto> listarActivos();
    Producto actualizar(Long id, Producto datos);
    void eliminar(Long id);
}

