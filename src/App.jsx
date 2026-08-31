import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Productos from './pages/Productos'
import NuevoProducto from './pages/NuevoProducto'
import Ventas from './pages/Ventas'
import NuevaVenta from './pages/NuevaVenta'
import DetalleVenta from './pages/DetalleVenta'
import Categorias from './pages/Categorias'
import NuevaCategoria from './pages/NuevaCategoria'
import Clientes from './pages/Clientes'
import NuevoCliente from './pages/NuevoCliente'
import Pagos from './pages/Pagos'
import NuevoPago from './pages/NuevoPago'

// Protege rutas — redirige a /login si no hay token
function PrivateRoute({ children }) {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pública */}
        <Route path="/login" element={<Login />} />

        {/* Privadas */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/productos" element={<PrivateRoute><Productos /></PrivateRoute>} />
        <Route path="/productos/nuevo" element={<PrivateRoute><NuevoProducto /></PrivateRoute>} />
        <Route path="/productos/:id/editar" element={<PrivateRoute><NuevoProducto /></PrivateRoute>} />
        <Route path="/ventas" element={<PrivateRoute><Ventas /></PrivateRoute>} />
        <Route path="/ventas/nueva" element={<PrivateRoute><NuevaVenta /></PrivateRoute>} />
        <Route path="/ventas/:id" element={<PrivateRoute><DetalleVenta /></PrivateRoute>} />
        <Route path="/ventas/:id/editar" element={<PrivateRoute><NuevaVenta /></PrivateRoute>} />
        <Route path="/categorias" element={<PrivateRoute><Categorias /></PrivateRoute>} />
        <Route path="/categorias/nueva" element={<PrivateRoute><NuevaCategoria /></PrivateRoute>} />
        <Route path="/categorias/:id/editar" element={<PrivateRoute><NuevaCategoria /></PrivateRoute>} />
        <Route path="/clientes" element={<PrivateRoute><Clientes /></PrivateRoute>} />
        <Route path="/clientes/nuevo" element={<PrivateRoute><NuevoCliente /></PrivateRoute>} />
        <Route path="/clientes/:id/editar" element={<PrivateRoute><NuevoCliente /></PrivateRoute>} />
        <Route path="/pagos" element={<PrivateRoute><Pagos /></PrivateRoute>} />
        <Route path="/pagos/nuevo" element={<PrivateRoute><NuevoPago /></PrivateRoute>} />
        <Route path="/pagos/:id/editar" element={<PrivateRoute><NuevoPago /></PrivateRoute>} />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
