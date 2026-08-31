import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const categorias = [
  { id: 1, nombre: 'Camisas',    descripcion: 'Camisas formales e informales', productos: 2, estado: 'Activa', badge: 'success' },
  { id: 2, nombre: 'Pantalones', descripcion: 'Pantalones de todo tipo',        productos: 2, estado: 'Activa', badge: 'success' },
  { id: 3, nombre: 'Chaquetas',  descripcion: 'Chaquetas y abrigos',            productos: 1, estado: 'Activa', badge: 'success' },
  { id: 4, nombre: 'Accesorios', descripcion: 'Cinturones, gorras y más',       productos: 0, estado: 'Inactiva', badge: 'warning' },
]

export default function Categorias() {
  return (
    <Layout>
      <div className="page-header">
        <h1><i className="bi bi-tags"></i> Categorías</h1>
        <div className="page-actions">
          <Link to="/categorias/nueva" className="btn-primary">
            <i className="bi bi-plus-lg"></i> Nueva Categoría
          </Link>
        </div>
      </div>

      <section className="table-section">
        <div className="table-toolbar">
          <span className="table-toolbar-title">Lista de categorías</span>
        </div>
        <table>
          <thead>
            <tr><th>#</th><th>Nombre</th><th>Descripción</th><th>Productos</th><th>Estado</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {categorias.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.nombre}</td>
                <td>{c.descripcion}</td>
                <td>{c.productos}</td>
                <td><span className={`badge badge-${c.badge}`}>{c.estado}</span></td>
                <td style={{ display: 'flex', gap: '0.3rem' }}>
                  <Link to={`/categorias/${c.id}/editar`} className="btn-sm btn-edit" title="Editar">
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
