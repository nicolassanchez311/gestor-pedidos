package ar.nico.pedidos.repository;

import ar.nico.pedidos.model.EstadoPedido;
import ar.nico.pedidos.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IPedidoRepository extends JpaRepository<Pedido, Long> {

}

