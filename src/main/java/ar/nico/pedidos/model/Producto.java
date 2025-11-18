package ar.nico.pedidos.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false, length = 140)
    private String nombre;

    @Column(length = 300)
    private String descripcion;

    @NotNull
    @DecimalMin("0.00")
    @Column(nullable = false, precision = 18, scale = 2)
    private BigDecimal precioBase;

    @Column(nullable = false, length = 10)
    private String moneda;

    @Column(nullable = false)
    private boolean activo = true;


}
