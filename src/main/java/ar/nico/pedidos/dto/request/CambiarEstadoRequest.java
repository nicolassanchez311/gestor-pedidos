package ar.nico.pedidos.dto.request;

import ar.nico.pedidos.model.EstadoPedido;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CambiarEstadoRequest {
    @NotNull
    private EstadoPedido nuevoEstado;
}

