package ar.nico.pedidos.service;

import ar.nico.pedidos.model.Cliente;
import java.util.List;

public interface IClienteService {
    Cliente crear(Cliente c);
    Cliente obtener(Long id);
    List<Cliente> listar();
    Cliente actualizar(Long id, Cliente datos);
    void eliminar(Long id);
}


