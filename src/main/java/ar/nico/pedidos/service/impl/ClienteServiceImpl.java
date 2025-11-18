package ar.nico.pedidos.service.impl;

import ar.nico.pedidos.model.Cliente;
import ar.nico.pedidos.repository.IClienteRepository;
import ar.nico.pedidos.service.IClienteService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class ClienteServiceImpl implements IClienteService {

    private final IClienteRepository repo;

    //  constructor
    public ClienteServiceImpl(IClienteRepository repo) {
        this.repo = repo;
    }

    @Override
    public Cliente crear(Cliente c) {
        if (repo.existsByEmail(c.getEmail())) {
            throw new IllegalArgumentException(" existe un cliente con ese email");
        }
        return repo.save(c);
    }

    @Override
    public Cliente obtener(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Cliente no encontrado"));
    }

    @Override
    public List<Cliente> listar() {
        return repo.findAll();
    }

    @Override
    public Cliente actualizar(Long id, Cliente datos) {
        Cliente c = obtener(id);
        c.setNombre(datos.getNombre());
        c.setEmail(datos.getEmail());
        c.setDireccionEntrega(datos.getDireccionEntrega());
        return repo.save(c);
    }

    @Override
    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}


