package ar.nico.pedidos.service.impl;

import ar.nico.pedidos.model.ItemPedido;
import ar.nico.pedidos.repository.IItemPedidoRepository;
import ar.nico.pedidos.service.IItemPedidoService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class ItemPedidoServiceImpl implements IItemPedidoService {

    private final IItemPedidoRepository repo;

    public ItemPedidoServiceImpl(IItemPedidoRepository repo) {
        this.repo = repo;
    }

    @Override
    public ItemPedido obtener(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Item no encontrado"));
    }

    @Override
    public List<ItemPedido> listarPorPedido(Long idPedido) {
        return repo.findByPedido_Id(idPedido);
    }

    @Override
    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}

