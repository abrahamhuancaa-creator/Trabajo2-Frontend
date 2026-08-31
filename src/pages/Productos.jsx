import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const productos = [
  { id: 1, sku: 'CAM-001', nombre: 'Camisa Oxford',   color: 'Blanco', categoria: 'Camisas',   talla: 'M',  precio: '$45.00', stock: 20, estado: 'Disponible', badge: 'success' },
  { id: 2, sku: 'PAN-001', nombre: 'Pantalón Chino',  color: 'Beige',  categoria: 'Pantalones',talla: 'L',  precio: '$60.00', stock: 15, estado: 'Disponible', badge: 'success' },
  { id: 3, sku: 'CHA-001', nombre: 'Chaqueta Casual', color: 'Negro',  categoria: 'Chaquetas', talla: 'L',  precio: '$95.00', stock: 8,  estado: 'Stock bajo', badge: 'warning' },
  { id: 4, sku: 'CAM-002', nombre: 'Polo Clásico',    color: 'Azul',   categoria: 'Camisas',   talla: 'S',  precio: '$30.00', stock: 25, estado: 'Disponible', badge: 'success' },
  { id: 5, sku: 'PAN-002', nombre: 'Jean Slim Fit',   color: 'Índigo', categoria: 'Pantalones',talla: '32', precio: '$75.00', stock: 12, estado: 'Disponible', badge: 'success' },
]

export default function Productos() {
  return (
    <Layout>
      <div className="page-header">
        <h1><i className="bi bi-box-seam"></i> Productos</h1>
        <div className="page-actions">
          <Link to="/productos/nuevo" className="btn-primary">
            <i className="bi bi-plus-lg"></i> Nuevo Producto
          </Link>
        </div>
      </div>

      <section className="table-section">
        <div className="table-toolbar">
          <span className="table-toolbar-title">Lista de productos</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th><th>SKU</th><th>Nombre</th><th>Color</th>
              <th>Categoría</th><th>Talla</th><th>Precio</th><th>Stock</th>
              <th>Estado</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.sku}</td>
                <td>{p.nombre}</td>
                <td>{p.color}</td>
                <td>{p.categoria}</td>
                <td>{p.talla}</td>
                <td>{p.precio}</td>
                <td>{p.stock}</td>
                <td><span className={`badge badge-${p.badge}`}>{p.estado}</span></td>
                <td style={{ display: 'flex', gap: '0.3rem' }}>
                  <Link to={`/productos/${p.id}/editar`} className="btn-sm btn-edit" title="Editar">
                    <i className="bi bi-pencil"></i>
                  </Link>
                  <button className="btn-sm btn-delete" title="Eliminar">
                    <i className="bi bi-trash3"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Layout>
  )
}
