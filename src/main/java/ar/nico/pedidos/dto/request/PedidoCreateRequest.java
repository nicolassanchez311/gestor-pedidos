package ar.nico.pedidos.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PedidoCreateRequest {
    @NotNull
    private Long idCliente;
}

