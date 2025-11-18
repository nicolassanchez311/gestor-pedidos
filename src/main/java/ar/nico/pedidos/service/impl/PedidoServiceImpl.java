package ar.nico.pedidos.service.impl;

import ar.nico.pedidos.model.*;
import ar.nico.pedidos.repository.IClienteRepository;
import ar.nico.pedidos.repository.IItemPedidoRepository;
import ar.nico.pedidos.repository.IPedidoRepository;
import ar.nico.pedidos.repository.IProductoRepository;
import ar.nico.pedidos.service.IPedidoService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Iterator;
import java.util.List;

@Service
@Transactional
public class PedidoServiceImpl implements IPedidoService {

    private final IPedidoRepository pedidos;
    private final IClienteRepository clientes;
    private final IProductoRepository productos;
    private final IItemPedidoRepository items;

    public PedidoServiceImpl(IPedidoRepository pedidos, IClienteRepository clientes, IProductoRepository productos, IItemPedidoRepository items) {
        this.pedidos = pedidos;
        this.clientes = clientes;
        this.productos = productos;
        this.items = items;
    }

    @Override
    public Pedido crear(Long idCliente) {
        Cliente cliente = clientes.findById(idCliente)
                .orElseThrow(() -> new IllegalArgumentException("Cliente no encontrado"));

        Pedido pedido = new Pedido();
        pedido.setCliente(cliente);
        pedido.setEstado(EstadoPedido.PENDIENTE);
        pedido.setFechaCreacion(LocalDateTime.now());

        return pedidos.save(pedido);
    }

    @Override
    public Pedido obtener(Long id) {
        return pedidos.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Pedido no encontrado"));
    }

    @Override
    public List<Pedido> listar() {
        return pedidos.findAll();
    }

    @Override
    public void eliminar(Long id) {
        pedidos.deleteById(id);
    }

    @Override
    public Pedido agregarItem(Long idPedido, Long idProducto, int cantidad) {
        if (cantidad < 1) {
            throw new IllegalArgumentException("Cantidad inválida");
        }

        Pedido pedido = obtener(idPedido);

        if (pedido.getEstado() != EstadoPedido.PENDIENTE) {
            throw new IllegalStateException("No se puede modificar un pedido en estado " + pedido.getEstado());
        }

        Producto producto = productos.findById(idProducto)
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado"));

        //  existe un item con ese product ??
        ItemPedido existente = null;
        for (ItemPedido ip : pedido.getItems()) {
            if (ip.getProducto().getId().equals(idProducto)) {
                existente = ip;
                break;
            }
        }

        if (existente != null) {
            // sumo cantidades
            existente.setCantidad(existente.getCantidad() + cantidad);
        } else {
            //  item nuevo
            ItemPedido item = new ItemPedido();
            item.setPedido(pedido);
            item.setProducto(producto);
            item.setCantidad(cantidad);
            item.setPrecioUnitario(producto.getPrecioBase());

            pedido.getItems().add(item);
        }

        return pedidos.save(pedido);
    }

    @Override
    public Pedido quitarItem(Long idPedido, Long idProducto) {
        Pedido pedido = obtener(idPedido);

        if (pedido.getEstado() != EstadoPedido.PENDIENTE) {
            throw new IllegalStateException("No se puede modificar un pedido en estado " + pedido.getEstado());
        }
        //borro item seleccionado
        Iterator<ItemPedido> it = pedido.getItems().iterator();
        while (it.hasNext()) {
            ItemPedido item = it.next();
            if (item.getProducto().getId().equals(idProducto)) {
                it.remove();
            }
        }
        return pedidos.save(pedido);
    }

    @Override
    public Pedido cambiarEstado(Long idPedido, EstadoPedido nuevoEstado) {
        Pedido pedido = obtener(idPedido);
        pedido.setEstado(nuevoEstado);
        return pedidos.save(pedido);
    }

    @Override
    public BigDecimal subtotal(Long idPedido) {
        Pedido pedido = obtener(idPedido);

        BigDecimal total = BigDecimal.ZERO;
        for (ItemPedido item : pedido.getItems()) {
            BigDecimal linea = item.getPrecioUnitario()
                    .multiply(BigDecimal.valueOf(item.getCantidad()));
            total = total.add(linea);
        }
        return total;
    }
}

