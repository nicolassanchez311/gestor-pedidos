package ar.nico.pedidos.mapper;


import ar.nico.pedidos.dto.response.ItemPedidoResponse;
import ar.nico.pedidos.model.ItemPedido;
import java.math.BigDecimal;
import org.springframework.stereotype.Component;

@Component
public class ItemPedidoMapper {

    private final ProductoMapper productoMapper;

    public ItemPedidoMapper(ProductoMapper productoMapper) {
        this.productoMapper = productoMapper;
    }

    public ItemPedidoResponse toResponse(ItemPedido entity) {
        if (entity == null) return null;

        BigDecimal subtotal = entity.getPrecioUnitario()
                .multiply(BigDecimal.valueOf(entity.getCantidad()));


        return ItemPedidoResponse.builder()
                .id(entity.getId())
                .producto(productoMapper.toResponse(entity.getProducto()))
                .cantidad(entity.getCantidad())
                .precioUnitario(entity.getPrecioUnitario())
                .subtotal(subtotal)
                .build();
    }
}

