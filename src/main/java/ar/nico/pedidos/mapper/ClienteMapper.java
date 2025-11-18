package ar.nico.pedidos.mapper;

import ar.nico.pedidos.dto.request.ClienteRequest;
import ar.nico.pedidos.dto.response.ClienteResponse;
import ar.nico.pedidos.model.Cliente;

public class ClienteMapper {


    public static Cliente toEntity(ClienteRequest r) {
        return Cliente.builder()
                .nombre(r.getNombre())
                .email(r.getEmail())
                .direccionEntrega(r.getDireccionEntrega())
                .build();
    }
    public static void update(Cliente c, ClienteRequest r) {
        c.setNombre(r.getNombre());
        c.setEmail(r.getEmail());
        c.setDireccionEntrega(r.getDireccionEntrega());
    }

    public static ClienteResponse toResponse(Cliente c) {
        return ClienteResponse.builder()
                .id(c.getId())
                .nombre(c.getNombre())
                .email(c.getEmail())
                .direccionEntrega(c.getDireccionEntrega())
                .build();
    }
}

