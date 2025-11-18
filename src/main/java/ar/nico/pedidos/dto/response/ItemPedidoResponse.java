package ar.nico.pedidos.dto.response;

import ar.nico.pedidos.model.Pedido;
import ar.nico.pedidos.model.Producto;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ItemPedidoResponse {
    private Long id;
    private ProductoResponse producto;
    private int cantidad;
    private BigDecimal precioUnitario;
    private BigDecimal subtotal;
}


