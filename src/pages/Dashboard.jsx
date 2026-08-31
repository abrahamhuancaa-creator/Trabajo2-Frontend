import Layout from '../components/Layout'

const stats = [
  { icon: 'bi-box-seam',    value: '5',    label: 'Productos',   color: '#2196f3' },
  { icon: 'bi-receipt',     value: '5',    label: 'Ventas',      color: '#f59e0b' },
  { icon: 'bi-people',      value: '5',    label: 'Clientes',    color: '#1b7a3b' },
  { icon: 'bi-credit-card', value: '$485', label: 'Total cobrado', color: '#c62828' },
]

const recentSales = [
  { id: 1, producto: 'Camisa Oxford',   cliente: 'Carlos Mamani', total: '$90.00',  estado: 'Completado', badge: 'success' },
  { id: 2, producto: 'Pantalón Chino',  cliente: 'Luis Quispe',   total: '$60.00',  estado: 'Completado', badge: 'success' },
  { id: 3, producto: 'Chaqueta Casual', cliente: 'Pedro Flores',  total: '$95.00',  estado: 'Pendiente',  badge: 'warning' },
  { id: 4, producto: 'Polo Clásico',    cliente: 'José Rojas',    total: '$90.00',  estado: 'Completado', badge: 'success' },
  { id: 5, producto: 'Jean Slim Fit',   cliente: 'Marco Condori', total: '$150.00', estado: 'En proceso', badge: 'info'    },
]

export default function Dashboard() {
  return (
    <Layout>
      <div className="page-header">
        <h1><i className="bi bi-speedometer2"></i> Panel Principal</h1>
      </div>

      <section className="cards-grid">
        {stats.map(({ icon, value, label }) => (
          <div className="info-card" key={label}>
            <div className="info-card-icon">
              <i className={`bi ${icon}`}></i>
            </div>
            <div className="info-card-data">
              <span className="info-card-value">{value}</span>
              <span className="info-card-label">{label}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="table-section">
        <div className="table-toolbar">
          <span className="table-toolbar-title">Ventas recientes</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th><th>Producto</th><th>Cliente</th><th>Total</th><th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {recentSales.map(s => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.producto}</td>
                <td>{s.cliente}</td>
                <td>{s.total}</td>
                <td><span className={`badge badge-${s.badge}`}>{s.estado}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Layout>
  )
}
