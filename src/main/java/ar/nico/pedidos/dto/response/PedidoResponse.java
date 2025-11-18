package ar.nico.pedidos.dto.response;

import ar.nico.pedidos.model.EstadoPedido;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PedidoResponse {
    private Long id;
    private ClienteResponse cliente;
    private LocalDateTime fechaCreacion;
    private EstadoPedido estado;
    private List<ItemPedidoResponse> items;
    private BigDecimal total;
}

