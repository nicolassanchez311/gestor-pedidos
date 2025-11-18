package ar.nico.pedidos.controller;

import ar.nico.pedidos.dto.request.CambiarEstadoRequest;
import ar.nico.pedidos.dto.request.PedidoCreateRequest;
import ar.nico.pedidos.dto.request.PedidoItemRequest;
import ar.nico.pedidos.dto.response.PedidoResponse;
import ar.nico.pedidos.mapper.PedidoMapper;
import ar.nico.pedidos.service.IPedidoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    private final IPedidoService service;
    private final PedidoMapper mapper;

    public PedidoController(IPedidoService service, PedidoMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    // Crear un pedido
    @PostMapping
    public ResponseEntity<PedidoResponse> crear(@RequestBody PedidoCreateRequest request) {
        var pedido = service.crear(request.getIdCliente());
        return ResponseEntity.ok(mapper.toResponse(pedido));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    // Listar todos los pedidos
    @GetMapping
    public ResponseEntity<List<PedidoResponse>> listar() {
        var pedidos = service.listar()
                .stream()
                .map(mapper::toResponse)
                .toList();

        return ResponseEntity.ok(pedidos);
    }

    // Agregar item
    @PostMapping("/{id}/items")
    public ResponseEntity<PedidoResponse> agregarItem(
            @PathVariable Long id,
            @RequestBody PedidoItemRequest request) {

        var pedido = service.agregarItem(id, request.getIdProducto(), request.getCantidad());
        return ResponseEntity.ok(mapper.toResponse(pedido));
    }

    // Quitar item
    @DeleteMapping("/{id}/items/{idProducto}")
    public ResponseEntity<PedidoResponse> quitarItem(
            @PathVariable Long id,
            @PathVariable Long idProducto) {

        var pedido = service.quitarItem(id, idProducto);
        return ResponseEntity.ok(mapper.toResponse(pedido));
    }

    // Cambiar estado
    @PatchMapping("/{id}/estado")
    public ResponseEntity<PedidoResponse> cambiarEstado(
            @PathVariable Long id,
            @RequestBody CambiarEstadoRequest request) {

        var pedido = service.cambiarEstado(id, request.getNuevoEstado());
        return ResponseEntity.ok(mapper.toResponse(pedido));
    }

    // Subtotal del pedido
    @GetMapping("/{id}/subtotal")
    public ResponseEntity<?> subtotal(@PathVariable Long id) {
        var total = service.subtotal(id);
        return ResponseEntity.ok(total);
    }

}

