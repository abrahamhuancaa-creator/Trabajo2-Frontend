import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import pagoService from '../services/pagoService'
import ventaService from '../services/ventaService'

export default function NuevoPago() {
  const { id } = useParams()
  const navigate = useNavigate()
  const esEdicion = Boolean(id)
  const [ventas, setVentas] = useState([])
  const [form, setForm] = useState({
    venta: { id: '' }, monto: '', fechaPago: new Date().toISOString().split('T')[0],
    metodoPago: 'EFECTIVO', referencia: '', estado: 'PAGADO', notas: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ventaService.listar().then(r => setVentas(r.data))
    if (esEdicion) {
      pagoService.obtener(id).then(r => {
        const p = r.data
        setForm({ venta: { id: p.venta?.id || '' }, monto: p.monto || '', fechaPago: p.fechaPago || '', metodoPago: p.metodoPago || 'EFECTIVO', referencia: p.referencia || '', estado: p.estado || 'PAGADO', notas: p.notas || '' })
      })
    }
  }, [id])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async e => {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      const payload = { ...form, monto: parseFloat(form.monto), venta: { id: parseInt(form.venta.id) } }
      if (esEdicion) await pagoService.actualizar(id, payload)
      else await pagoService.crear(payload)
      navigate('/pagos')
    } catch { setError('Error al guardar') } finally { setLoading(false) }
  }

  return (
    <Layout>
      <div className="page-header">
        <h1><i className={`bi ${esEdicion ? 'bi-pencil-square' : 'bi-plus-circle'}`}></i> {esEdicion ? 'Editar Pago' : 'Nuevo Pago'}</h1>
      </div>
      <div className="form-card">
        {error && <div className="login-error mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Venta *</label>
              <select value={form.venta.id} onChange={e => set('venta', { id: e.target.value })} required>
                <option value="">-- Seleccionar venta --</option>
                {ventas.map(v => <option key={v.id} value={v.id}>#{v.id} - {v.cliente?.nombre} (Bs {v.total?.toFixed(2)})</option>)}
              </select>
            </div>
            <div className="form-group"><label>Monto (Bs) *</label><input type="number" step="0.01" value={form.monto} onChange={e => set('monto', e.target.value)} required /></div>
            <div className="form-group"><label>Fecha Pago *</label><input type="date" value={form.fechaPago} onChange={e => set('fechaPago', e.target.value)} required /></div>
            <div className="form-group">
              <label>Método de Pago</label>
              <select value={form.metodoPago} onChange={e => set('metodoPago', e.target.value)}>
                <option>EFECTIVO</option><option>TARJETA</option><option>TRANSFERENCIA</option><option>QR</option>
              </select>
            </div>
            <div className="form-group"><label>Referencia</label><input value={form.referencia} onChange={e => set('referencia', e.target.value)} /></div>
            <div className="form-group">
              <label>Estado</label>
              <select value={form.estado} onChange={e => set('estado', e.target.value)}>
                <option>PAGADO</option><option>PENDIENTE</option><option>RECHAZADO</option>
              </select>
            </div>
            <div className="form-group full"><label>Notas</label><textarea value={form.notas} onChange={e => set('notas', e.target.value)} rows={2} /></div>
          </div>
          <div className="form-actions">
            <button className="btn-primary" type="submit" disabled={loading}><i className="bi bi-check-lg"></i> {loading ? 'Guardando...' : 'Guardar'}</button>
            <Link to="/pagos" className="btn-secondary">Cancelar</Link>
          </div>
        </form>
      </div>
    </Layout>
  )
}
