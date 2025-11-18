package ar.nico.pedidos.repository;

import ar.nico.pedidos.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IProductoRepository extends JpaRepository<Producto, Long> {
    List<Producto> findByActivoTrue();
}

