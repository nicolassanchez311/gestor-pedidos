package ar.nico.pedidos.service;

import ar.nico.pedidos.model.ItemPedido;
import java.util.List;

public interface IItemPedidoService {
    ItemPedido obtener(Long id);
    List<ItemPedido> listarPorPedido(Long idPedido);
    void eliminar(Long id);
}

