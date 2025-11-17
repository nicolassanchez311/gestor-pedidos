 Gestor de Pedidos  
Proyecto Fullstack – React + Spring Boot

Este proyecto es un **sistema completo para gestionar productos, clientes y pedidos**, implementado con un **backend en Java/Spring Boot** y un **frontend en React con Vite**.  
Permite realizar CRUDS completos y manejar el flujo de pedidos con diferentes estados.

---

 Tecnologías utilizadas

 Backend – Java + Spring Boot
- Java 17  
- Spring Boot  
- Spring Web  
- Spring Data JPA  
- Hibernate  
- Maven  
- Lombok  
- CORS Config  
- H2 (durante desarrollo)

 Frontend – React + Vite
- React 19  
- Vite  
- Axios  
- Bootstrap 5  
- React Hooks


 Funcionalidades principales

 Gestión de Productos
- Crear, editar, eliminar productos
- Atributos: nombre, descripción, precio, moneda, activo/inactivo

 Gestión de Clientes
- Crear, editar, eliminar clientes
- Datos: nombre, email, dirección de entrega

 Gestión de Pedidos
- Crear pedidos asignándolos a un cliente
- Agregar/editar/quitar items
- Calcular total automáticamente
- Manejo de estados:  
  `PENDIENTE → CONFIRMADO → ENVIADO → ENTREGADO`  
  También `CANCELADO`
  
Dashboard inicial
- Vista general para navegar entre Productos, Clientes y Pedidos



 Arquitectura del backend

 
Patrones aplicados:
- DTO Request/Response
- Mappers dedicados
- Interfaces + implementación (principios SOLID)
- Capas separadas y limpias


▶ Cómo ejecutar el proyecto
Ubicarte en la carpeta raíz del proyecto y ejecutar:

mvn spring-boot:run

El backend inicia en:

...http://localhost:8080

Entrar a la carpeta del front:

cd gestor-pedidos-front
npm install
npm run dev

Se levanta en:

 http://localhost:5173


