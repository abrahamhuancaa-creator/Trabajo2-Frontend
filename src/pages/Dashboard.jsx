import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import productoService from '../services/productoService'
import ventaService from '../services/ventaService'
import clienteService from '../services/clienteService'
import pagoService from '../services/pagoService'

export default function Dashboard() {
  const [stats, setStats] = useState({ productos: 0, ventas: 0, clientes: 0, ingresos: 0 })
  const [ventasRecientes, setVentasRecientes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      productoService.listar(),
      ventaService.listar(),
      clienteService.listar(),
      pagoService.listar(),
    ]).then(([prods, ventas, clientes, pagos]) => {
      const ingresos = pagos.data
        .filter(p => p.estado === 'PAGADO')
        .reduce((sum, p) => sum + (p.monto || 0), 0)

      setStats({
        productos: prods.data.length,
        ventas: ventas.data.length,
        clientes: clientes.data.length,
        ingresos,
      })
      setVentasRecientes(ventas.data.slice(-5).reverse())
    }).catch(console.error)
    .finally(() => setLoading(false))
  }, [])

  const statCards = [
    { label: 'Productos', value: stats.productos, icon: 'bi-box-seam',     color: '#2196f3' },
    { label: 'Ventas',    value: stats.ventas,    icon: 'bi-receipt',       color: '#8b5cf6' },
    { label: 'Clientes',  value: stats.clientes,  icon: 'bi-people',        color: '#10b981' },
    { label: 'Ingresos',  value: `Bs ${stats.ingresos.toFixed(2)}`, icon: 'bi-cash-stack', color: '#f59e0b' },
  ]

  return (
    <Layout>
      <div className="page-header">
        <h1><i className="bi bi-speedometer2"></i> Dashboard</h1>
        <span style={{ color: 'var(--color-muted)', fontSize: '0.85rem' }}>
          {new Date().toLocaleDateString('es-BO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {statCards.map(s => (
          <div className="stat-card" key={s.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="stat-label">{s.label}</span>
              <i className={`bi ${s.icon}`} style={{ fontSize: '1.4rem', color: s.color }}></i>
            </div>
            <div className="stat-value" style={{ color: s.color }}>
              {loading ? '—' : s.value}
            </div>
            <div className="stat-sub">Registros en el sistema</div>
          </div>
        ))}
      </div>

      {/* Ventas recientes */}
      <section className="table-section">
        <div className="table-toolbar">
          <span className="table-toolbar-title">Ventas recientes</span>
        </div>
        <div className="table-wrapper">
          {loading ? <p className="p-4 text-center text-gray-400">Cargando...</p> : (
            <table>
              <thead>
                <tr>
                  <th>#</th><th>Fecha</th><th>Cliente</th><th>Producto</th><th>Total</th><th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {ventasRecientes.length === 0
                  ? <tr><td colSpan={6} style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--color-muted)' }}>No hay ventas aún</td></tr>
                  : ventasRecientes.map(v => (
                    <tr key={v.id}>
                      <td>#{v.id}</td>
                      <td>{v.fecha}</td>
                      <td>{v.cliente?.nombre || '—'}</td>
                      <td>{v.producto?.nombre || '—'}</td>
                      <td><strong>Bs {v.total?.toFixed(2)}</strong></td>
                      <td>
                        <span className={`badge ${v.estado === 'COMPLETADO' ? 'badge-success' : v.estado === 'CANCELADO' ? 'badge-danger' : 'badge-warning'}`}>
                          {v.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </Layout>
  )
}
