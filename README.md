# Backend de la Tienda de Café

Este servicio gestiona la autenticación, administración de productos (inventarios), transacciones de agricultores y tendencias de precios.

## Nuevas Adiciones a la API
1. **Endpoint de Checkout (`POST /api/products/buy`):**
   - Recibe un listado de productos y cantidades en el body: `{ items: [{ productId, quantity }] }`.
   - Valida la disponibilidad de stock, realiza la compra disminuyendo el stock en la base de datos MongoDB y responde con éxito.
2. **Rol Cliente (`CUSTOMER`):**
   - Habilitado como rol válido para registro y autenticación.
   - Autorizado para interactuar con consultas de productos y realizar compras a través de la API de checkout.

## Tecnologías Utilizadas

- Node.js
- Express
- GraphQL (Apollo Server)
- MongoDB (Mongoose)
- TypeScript
- Autenticación con JWT

## Estructura de Directorios

- `src/config`: Configuraciones de conexión, inicializadores (seed) y constantes (roles y mensajes)
- `src/controllers`: Capa de controladores para peticiones HTTP (autenticación, productos y compras)
- `src/graphql`: Esquema typeDefs y resolvers para GraphQL (utilizado para tendencias de mercado y métricas de marca)
- `src/middleware`: Middleware de autorización de roles y autenticación JWT
- `src/models`: Esquemas de datos para Mongoose (User, Product, CoffeeBatch, PriceTrend)
- `src/routes`: Rutas REST de Express (Auth, Coffee, Products)
- `src/services`: Capa de lógica de negocio y operaciones de base de datos
- `src/server.ts`: Punto de inicio del servidor

## Instalación

```bash
npm install
```

## Inicializar Base de Datos (Seeding)

Puebla la base de datos local de MongoDB con agricultores, operadores de marca, lotes y productos iniciales:

```bash
npm run seed
```

## Servidor de Desarrollo

```bash
npm run dev
```

## Compilación y Ejecución en Producción

```bash
npm run build
```
