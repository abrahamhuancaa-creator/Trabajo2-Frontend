import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import pagoService from '../services/pagoService'

export default function Pagos() {
  const [pagos, setPagos] = useState([])
  const [loading, setLoading] = useState(true)

  const cargar = async () => {
    try { const { data } = await pagoService.listar(); setPagos(data) }
    catch (e) { console.error(e) } finally { setLoading(false) }
  }
  useEffect(() => { cargar() }, [])

  const eliminar = async id => {
    if (!confirm('¿Eliminar este pago?')) return
    await api.delete(`/pagos/${id}`)
    setPagos(prev => prev.filter(p => p.id !== id))
  }

  return (
    <Layout>
      <div className="page-header">
        <h1><i className="bi bi-credit-card"></i> Pagos</h1>
        <div className="page-actions">
          <Link to="/pagos/nuevo" className="btn-primary"><i className="bi bi-plus-lg"></i> Nuevo Pago</Link>
        </div>
      </div>
      <section className="table-section">
        <div className="table-toolbar">
          <span className="table-toolbar-title">Lista de pagos ({pagos.length})</span>
        </div>
        <div className="table-wrapper">
          {loading ? <p className="p-4 text-center">Cargando...</p> : (
            <table>
              <thead><tr><th>#</th><th>Venta</th><th>Monto</th><th>Fecha</th><th>Método</th><th>Estado</th><th>Acciones</th></tr></thead>
              <tbody>
                {pagos.length === 0
                  ? <tr><td colSpan={7} className="text-center p-4">Sin pagos</td></tr>
                  : pagos.map(p => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>#{p.venta?.id || '—'}</td>
                      <td><strong>Bs {p.monto?.toFixed(2)}</strong></td>
                      <td>{p.fechaPago}</td>
                      <td>{p.metodoPago}</td>
                      <td><span className={`badge ${p.estado === 'PAGADO' ? 'badge-success' : p.estado === 'RECHAZADO' ? 'badge-danger' : 'badge-warning'}`}>{p.estado}</span></td>
                      <td style={{ display: 'flex', gap: '0.3rem' }}>
                        <Link to={`/pagos/${p.id}/editar`} className="btn-sm btn-edit"><i className="bi bi-pencil"></i></Link>
                        <button className="btn-sm btn-delete" onClick={() => eliminar(p.id)}><i className="bi bi-trash3"></i></button>
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
