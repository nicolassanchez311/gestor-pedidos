package ar.nico.pedidos.dto.response;

import lombok.Getter;
import lombok.Setter;
import lombok.Builder;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClienteResponse {
    private Long id;
    private String nombre;
    private String email;
    private String direccionEntrega;
}
