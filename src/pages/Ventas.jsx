import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import ventaService from '../services/ventaService'

export default function Ventas() {
  const [ventas, setVentas] = useState([])
  const [loading, setLoading] = useState(true)

  const cargar = async () => {
    try { const { data } = await ventaService.listar(); setVentas(data) }
    catch (e) { console.error(e) }
    finally { setLoading(false) }
  }
  useEffect(() => { cargar() }, [])

  const eliminar = async id => {
    if (!confirm('¿Eliminar esta venta?')) return
    await api.delete(`/ventas/${id}`)
    setVentas(prev => prev.filter(v => v.id !== id))
  }

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
          <span className="table-toolbar-title">Lista de ventas ({ventas.length})</span>
        </div>
        <div className="table-wrapper">
          {loading ? <p className="p-4 text-center text-gray-400">Cargando...</p> : (
            <table>
              <thead>
                <tr>
                  <th>#</th><th>Fecha</th><th>Cliente</th><th>Producto</th>
                  <th>Cant.</th><th>Precio Unit.</th><th>Total</th><th>Estado</th><th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {ventas.length === 0
                  ? <tr><td colSpan={9} className="text-center p-4 text-gray-400">Sin ventas</td></tr>
                  : ventas.map(v => (
                    <tr key={v.id}>
                      <td>{v.id}</td>
                      <td>{v.fecha}</td>
                      <td>{v.cliente?.nombre || '—'}</td>
                      <td>{v.producto?.nombre || '—'}</td>
                      <td>{v.cantidad}</td>
                      <td>Bs {v.precioUnitario?.toFixed(2)}</td>
                      <td><strong>Bs {v.total?.toFixed(2)}</strong></td>
                      <td>
                        <span className={`badge ${v.estado === 'COMPLETADO' ? 'badge-success' : v.estado === 'CANCELADO' ? 'badge-danger' : 'badge-warning'}`}>
                          {v.estado}
                        </span>
                      </td>
                      <td style={{ display: 'flex', gap: '0.3rem' }}>
                        <Link to={`/ventas/${v.id}/editar`} className="btn-sm btn-edit" title="Editar">
                          <i className="bi bi-pencil"></i>
                        </Link>
                        <button className="btn-sm btn-delete" title="Eliminar" onClick={() => eliminar(v.id)}>
                          <i className="bi bi-trash3"></i>
                        </button>
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
