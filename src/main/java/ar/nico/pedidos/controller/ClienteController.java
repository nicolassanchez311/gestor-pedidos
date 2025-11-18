package ar.nico.pedidos.controller;

import ar.nico.pedidos.dto.request.ClienteRequest;
import ar.nico.pedidos.dto.response.ClienteResponse;
import ar.nico.pedidos.mapper.ClienteMapper;
import ar.nico.pedidos.service.IClienteService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final IClienteService service;
    public ClienteController(IClienteService service) { this.service = service; }

    @PostMapping
    //creamos cliiente
    public ResponseEntity<ClienteResponse> crear(@Valid @RequestBody ClienteRequest req) {
        var creado = service.crear(ClienteMapper.toEntity(req));
        return ResponseEntity.created(URI.create("/api/clientes/" + creado.getId()))
                .body(ClienteMapper.toResponse(creado));
    }
   //obtenemoss el cliiente
    @GetMapping("/{id}")
    public ClienteResponse obtener(@PathVariable Long id) {
        return ClienteMapper.toResponse(service.obtener(id));
    }
    //llamamos a los cliientess y liisstamos
    @GetMapping
    public List<ClienteResponse> listar() {
        return service.listar().stream().map(ClienteMapper::toResponse).toList();
    }
    //actualisamos
    @PutMapping("/{id}")
    public ClienteResponse actualizar(@PathVariable Long id, @Valid @RequestBody ClienteRequest req) {
        var actualizado = service.actualizar(id, ClienteMapper.toEntity(req));
        return ClienteMapper.toResponse(actualizado);
    }
    //eliminamos
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
