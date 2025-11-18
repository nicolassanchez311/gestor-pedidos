package ar.nico.pedidos.mapper;

import ar.nico.pedidos.dto.request.ProductoRequest;
import ar.nico.pedidos.dto.response.ProductoResponse;
import ar.nico.pedidos.model.Producto;
import org.springframework.stereotype.Component;

@Component
public class ProductoMapper {


    public Producto toEntity(ProductoRequest request) {
        if (request == null) return null;

        return Producto.builder()
                .nombre(request.getNombre())
                .descripcion(request.getDescripcion())
                .precioBase(request.getPrecioBase())
                .moneda(request.getMoneda())
                .activo(request.getActivo() != null ? request.getActivo() : true)
                .build();
    }

    public void update(Producto producto, ProductoRequest request) {
        if (producto == null || request == null) return;

        producto.setNombre(request.getNombre());
        producto.setDescripcion(request.getDescripcion());
        producto.setPrecioBase(request.getPrecioBase());
        producto.setMoneda(request.getMoneda());

        if (request.getActivo() != null) {
            producto.setActivo(request.getActivo());
        }
    }

    public ProductoResponse toResponse(Producto entity) {
        if (entity == null) return null;

        return ProductoResponse.builder()
                .id(entity.getId())
                .nombre(entity.getNombre())
                .descripcion(entity.getDescripcion())
                .precioBase(entity.getPrecioBase())
                .moneda(entity.getMoneda())
                .activo(entity.isActivo())
                .build();
    }
}



