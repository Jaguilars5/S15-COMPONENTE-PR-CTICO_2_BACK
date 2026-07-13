# Backend de la Tienda de Café

Este servicio gestiona la autenticación, administración de productos, transacciones de agricultores y tendencias de precios.

## Tecnologías Utilizadas

- Node.js
- Express
- GraphQL (Apollo Server)
- MongoDB (Mongoose)
- TypeScript
- Autenticación con JWT

## Estructura de Directorios

- `src/config`: Configuraciones de conexión, inicializadores y constantes
- `src/controllers`: Capa de controladores para peticiones HTTP
- `src/graphql`: Esquema typeDefs y resolvers para GraphQL
- `src/middleware`: Middleware de autorización y autenticación
- `src/models`: Esquemas de datos para Mongoose
- `src/routes`: Rutas REST de Express
- `src/services`: Capa de lógica de negocio y operaciones de base de datos
- `src/server.ts`: Punto de inicio del servidor

## Instalación

```bash
npm install
```

## Inicializar Base de Datos

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
npm start
```
