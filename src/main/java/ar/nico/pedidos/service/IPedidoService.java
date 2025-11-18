package ar.nico.pedidos.service;

import ar.nico.pedidos.model.EstadoPedido;
import ar.nico.pedidos.model.Pedido;

import java.math.BigDecimal;
import java.util.List;

public interface IPedidoService {
    Pedido crear(Long idCliente);
    Pedido obtener(Long id);
    List<Pedido> listar();
    void eliminar(Long id);
    Pedido agregarItem(Long idPedido, Long idProducto, int cantidad);
    Pedido quitarItem(Long idPedido, Long idProducto);
    BigDecimal subtotal(Long idPedido);
    Pedido cambiarEstado(Long idPedido, EstadoPedido nuevo);
}

