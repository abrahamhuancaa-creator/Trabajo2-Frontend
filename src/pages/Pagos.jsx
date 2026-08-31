import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const pagos = [
  { id: 1, fecha: '20/08/2026', venta: 'VTA-0001', cliente: 'Carlos Mamani', monto: '$90.00',  metodo: 'Efectivo',       ref: '—',              estado: 'Pagado',    badge: 'success' },
  { id: 2, fecha: '21/08/2026', venta: 'VTA-0002', cliente: 'Luis Quispe',   monto: '$60.00',  metodo: 'Tarjeta',        ref: 'TC-****4521',    estado: 'Pagado',    badge: 'success' },
  { id: 3, fecha: '22/08/2026', venta: 'VTA-0003', cliente: 'Pedro Flores',  monto: '$95.00',  metodo: 'Transferencia',  ref: 'TRF-2026-0071',  estado: 'Pendiente', badge: 'warning' },
  { id: 4, fecha: '24/08/2026', venta: 'VTA-0004', cliente: 'José Rojas',    monto: '$90.00',  metodo: 'Efectivo',       ref: '—',              estado: 'Pagado',    badge: 'success' },
  { id: 5, fecha: '25/08/2026', venta: 'VTA-0005', cliente: 'Marco Condori', monto: '$150.00', metodo: 'Transferencia',  ref: 'TRF-2026-0089',  estado: 'Sin pagar', badge: 'danger'  },
]

export default function Pagos() {
  return (
    <Layout>
      <div className="page-header">
        <h1><i className="bi bi-credit-card"></i> Pagos</h1>
        <div className="page-actions">
          <Link to="/pagos/nuevo" className="btn-primary">
            <i className="bi bi-plus-lg"></i> Registrar Pago
          </Link>
        </div>
      </div>

      <section className="table-section">
        <div className="table-toolbar">
          <span className="table-toolbar-title">Historial de pagos</span>
        </div>
        <table>
          <thead>
            <tr><th>#</th><th>Fecha</th><th>N° Venta</th><th>Cliente</th><th>Monto</th><th>Método</th><th>Referencia</th><th>Estado</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {pagos.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td><td>{p.fecha}</td><td>{p.venta}</td><td>{p.cliente}</td>
                <td>{p.monto}</td><td>{p.metodo}</td><td>{p.ref}</td>
                <td><span className={`badge badge-${p.badge}`}>{p.estado}</span></td>
                <td style={{ display: 'flex', gap: '0.3rem' }}>
                  <Link to={`/pagos/${p.id}/editar`} className="btn-sm btn-edit" title="Editar">
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
