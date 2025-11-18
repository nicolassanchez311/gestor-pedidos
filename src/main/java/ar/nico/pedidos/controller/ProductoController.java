package ar.nico.pedidos.controller;

import ar.nico.pedidos.dto.request.ProductoRequest;
import ar.nico.pedidos.dto.response.ProductoResponse;
import ar.nico.pedidos.mapper.ProductoMapper;
import ar.nico.pedidos.model.Producto;
import ar.nico.pedidos.service.IProductoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/productos")
public class ProductoController {

    private final IProductoService service;
    private final ProductoMapper mapper;

    public ProductoController(IProductoService service, ProductoMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    // Crear producto
    @PostMapping
    public ResponseEntity<ProductoResponse> crear(@RequestBody ProductoRequest request) {
        Producto entidad = mapper.toEntity(request);
        Producto guardado = service.crear(entidad);
        return ResponseEntity.ok(mapper.toResponse(guardado));
    }

    // Listar todos los productos
    @GetMapping
    public ResponseEntity<List<ProductoResponse>> listar() {
        List<ProductoResponse> lista = service.listar().stream()
                .map(mapper::toResponse)
                .toList();
        return ResponseEntity.ok(lista);
    }

    // Listar solo activos
    @GetMapping("/activos")
    public ResponseEntity<List<ProductoResponse>> listarActivos() {
        List<ProductoResponse> lista = service.listarActivos().stream()
                .map(mapper::toResponse)
                .toList();
        return ResponseEntity.ok(lista);
    }

    // Obtener un producto por id
    @GetMapping("/{id}")
    public ResponseEntity<ProductoResponse> obtener(@PathVariable Long id) {
        Producto producto = service.obtener(id);   // <-- usa obtener(...)
        return ResponseEntity.ok(mapper.toResponse(producto));
    }

    // Actualizar producto
    @PutMapping("/{id}")
    public ResponseEntity<ProductoResponse> actualizar(
            @PathVariable Long id,
            @RequestBody ProductoRequest request
    ) {

        Producto datos = mapper.toEntity(request);
        Producto actualizado = service.actualizar(id, datos);
        return ResponseEntity.ok(mapper.toResponse(actualizado));
    }

    // Eliminar producto
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
