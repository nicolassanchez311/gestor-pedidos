package ar.nico.pedidos.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PedidoItemRequest {
    @NotNull
    private Long idProducto;

    @Min(1)
    private int cantidad;
}


