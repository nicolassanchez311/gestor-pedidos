package ar.nico.pedidos.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;

import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "clientes")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String nombre;


    @Email
    @Column(nullable = false, length = 180, unique = true)
    private String email;

    @Column(length = 255)
    private String direccionEntrega;


}


