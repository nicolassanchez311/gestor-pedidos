package ar.nico.pedidos.dto.request;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Getter
@Setter
public class ProductoRequest {
    @NotBlank
    private String nombre;

    private String descripcion;

    @NotNull
    @DecimalMin("0.00")
    private BigDecimal precioBase;

    @NotBlank
    private String moneda;

    private Boolean activo;
}


