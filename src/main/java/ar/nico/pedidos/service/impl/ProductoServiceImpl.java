package ar.nico.pedidos.service.impl;

import ar.nico.pedidos.model.Producto;
import ar.nico.pedidos.repository.IProductoRepository;
import ar.nico.pedidos.service.IProductoService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class ProductoServiceImpl implements IProductoService {

    private final IProductoRepository repo;

    public ProductoServiceImpl(IProductoRepository repo) {
        this.repo = repo;
    }

    @Override
    public Producto crear(Producto p) {
        return repo.save(p);
    }

    @Override
    public Producto obtener(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado"));
    }

    @Override
    public List<Producto> listar() {
        return repo.findAll();
    }

    @Override
    public List<Producto> listarActivos() {
        return repo.findByActivoTrue();
    }

    @Override
    public Producto actualizar(Long id, Producto datos) {
        Producto p = obtener(id);
        p.setNombre(datos.getNombre());
        p.setDescripcion(datos.getDescripcion());
        p.setPrecioBase(datos.getPrecioBase());
        p.setMoneda(datos.getMoneda());
        p.setActivo(datos.isActivo());
        return repo.save(p);
    }

    @Override
    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}


