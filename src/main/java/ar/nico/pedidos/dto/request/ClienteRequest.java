package ar.nico.pedidos.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClienteRequest {
    private String nombre;
    private String email;
    private String direccionEntrega;
}
