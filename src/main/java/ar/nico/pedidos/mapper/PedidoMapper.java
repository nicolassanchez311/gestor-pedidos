package ar.nico.pedidos.mapper;

import ar.nico.pedidos.dto.response.PedidoResponse;
import ar.nico.pedidos.model.Pedido;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;


@Component
public class PedidoMapper {

    private final ItemPedidoMapper itemMapper;

    public PedidoMapper(ItemPedidoMapper itemMapper) {
        this.itemMapper = itemMapper;
    }

    public PedidoResponse toResponse(Pedido entity) {
        if (entity == null) return null;


        var itemsDto = entity.getItems()
                .stream()
                .map(itemMapper::toResponse)
                .toList();

        BigDecimal total = itemsDto.stream()
                .map(i -> i.getSubtotal() != null ? i.getSubtotal() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return PedidoResponse.builder()
                .id(entity.getId())
                .cliente(ClienteMapper.toResponse(entity.getCliente()))
                .fechaCreacion(entity.getFechaCreacion())
                .estado(entity.getEstado())
                .items(itemsDto)
                .total(total)
                .build();
    }
}



