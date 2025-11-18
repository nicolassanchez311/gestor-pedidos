package ar.nico.pedidos.model;

public enum EstadoPedido {
    PENDIENTE, CONFIRMADO, ENVIADO, ENTREGADO, CANCELADO
}

//  define los únicos estados válidos que puede tener un pedido. Sirve para evitar valores incorrectos y para representar las reglas del negocio de manera clara y segura.
