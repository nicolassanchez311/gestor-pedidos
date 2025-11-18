package ar.nico.pedidos.repository;

import ar.nico.pedidos.model.ItemPedido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IItemPedidoRepository extends JpaRepository<ItemPedido, Long> {
    List<ItemPedido> findByPedido_Id(Long idPedido);
}

