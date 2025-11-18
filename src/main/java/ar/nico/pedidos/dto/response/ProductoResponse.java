package ar.nico.pedidos.dto.response;

import lombok.*;
import java.math.BigDecimal;
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductoResponse{
    private Long id;
    private String nombre;
    private String descripcion;
    private BigDecimal precioBase;
    private String moneda;
    private boolean activo = true;
}

