# StyleShop — Frontend React

SPA desarrollada con **React 18** + **Vite** + **Tailwind CSS v3**.

## Requisitos

- Node.js 18+
- npm 9+

## Instalar dependencias

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

App en: **http://localhost:5173**

## Estructura del proyecto

```
src/
├── components/      ← Layout.jsx, Subnav.jsx
├── pages/           ← Login, Dashboard, Productos, Ventas, Categorias, Clientes, Pagos
├── services/        ← api.js (Axios base), authService, productoService, ventaService, ...
├── App.jsx          ← Rutas con React Router DOM
├── main.jsx
└── index.css        ← Tailwind + estilos globales
```

## Páginas

| Ruta | Componente |
|------|-----------|
| `/login` | Login |
| `/dashboard` | Dashboard |
| `/productos` | Productos |
| `/productos/nuevo` | NuevoProducto |
| `/productos/:id/editar` | NuevoProducto |
| `/ventas` | Ventas |
| `/ventas/nueva` | NuevaVenta |
| `/ventas/:id/editar` | NuevaVenta |
| `/categorias` | Categorias |
| `/clientes` | Clientes |
| `/pagos` | Pagos |

> El frontend requiere que el backend esté corriendo en `http://localhost:8080`
