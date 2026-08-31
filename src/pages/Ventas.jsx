import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const ventas = [
  { id: 1, fecha: '20/08/2026', producto: 'Camisa Oxford',   categoria: 'Camisas',    cant: 2, precio: '$45.00', total: '$90.00',  cliente: 'Carlos Mamani', estado: 'Completado', badge: 'success' },
  { id: 2, fecha: '21/08/2026', producto: 'Pantalón Chino',  categoria: 'Pantalones', cant: 1, precio: '$60.00', total: '$60.00',  cliente: 'Luis Quispe',   estado: 'Completado', badge: 'success' },
  { id: 3, fecha: '22/08/2026', producto: 'Chaqueta Casual', categoria: 'Chaquetas',  cant: 1, precio: '$95.00', total: '$95.00',  cliente: 'Pedro Flores',  estado: 'Pendiente',  badge: 'warning' },
  { id: 4, fecha: '24/08/2026', producto: 'Polo Clásico',    categoria: 'Camisas',    cant: 3, precio: '$30.00', total: '$90.00',  cliente: 'José Rojas',    estado: 'Completado', badge: 'success' },
  { id: 5, fecha: '25/08/2026', producto: 'Jean Slim Fit',   categoria: 'Pantalones', cant: 2, precio: '$75.00', total: '$150.00', cliente: 'Marco Condori', estado: 'En proceso', badge: 'info'    },
]

export default function Ventas() {
  return (
    <Layout>
      <div className="page-header">
        <h1><i className="bi bi-receipt"></i> Ventas</h1>
        <div className="page-actions">
          <Link to="/ventas/nueva" className="btn-primary">
            <i className="bi bi-plus-lg"></i> Nueva Venta
          </Link>
        </div>
      </div>

      <section className="table-section">
        <div className="table-toolbar">
          <span className="table-toolbar-title">Historial de ventas</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th><th>Fecha</th><th>Producto</th><th>Categoría</th>
              <th>Cant.</th><th>Precio</th><th>Total</th><th>Cliente</th>
              <th>Estado</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map(v => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.fecha}</td>
                <td>{v.producto}</td>
                <td>{v.categoria}</td>
                <td>{v.cant}</td>
                <td>{v.precio}</td>
                <td>{v.total}</td>
                <td>{v.cliente}</td>
                <td><span className={`badge badge-${v.badge}`}>{v.estado}</span></td>
                <td style={{ display: 'flex', gap: '0.3rem' }}>
                  <Link to={`/ventas/${v.id}`} className="btn-sm btn-view" title="Ver detalle">
                    <i className="bi bi-eye"></i>
                  </Link>
                  <Link to={`/ventas/${v.id}/editar`} className="btn-sm btn-edit" title="Editar">
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
