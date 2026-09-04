import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import ventaService from '../services/ventaService'
import productoService from '../services/productoService'
import clienteService from '../services/clienteService'

export default function NuevaVenta() {
  const { id } = useParams()
  const navigate = useNavigate()
  const esEdicion = Boolean(id)

  const [clientes, setClientes] = useState([])
  const [productos, setProductos] = useState([])
  const [form, setForm] = useState({
    fecha: new Date().toISOString().split('T')[0],
    cliente: { id: '' }, producto: { id: '' },
    cantidad: 1, precioUnitario: '', estado: 'PENDIENTE', notas: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    clienteService.listar().then(r => setClientes(r.data))
    productoService.listar().then(r => setProductos(r.data))
    if (esEdicion) {
      ventaService.obtener(id).then(r => {
        const v = r.data
        setForm({
          fecha: v.fecha, cliente: { id: v.cliente?.id || '' },
          producto: { id: v.producto?.id || '' },
          cantidad: v.cantidad, precioUnitario: v.precioUnitario,
          estado: v.estado, notas: v.notas || ''
        })
      })
    }
  }, [id])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleProductoChange = e => {
    const prod = productos.find(p => p.id === parseInt(e.target.value))
    setForm(f => ({ ...f, producto: { id: e.target.value }, precioUnitario: prod ? prod.precio : f.precioUnitario }))
  }

  const handleSubmit = async e => {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      const payload = {
        ...form,
        cantidad: parseInt(form.cantidad),
        precioUnitario: parseFloat(form.precioUnitario),
        cliente: { id: parseInt(form.cliente.id) },
        producto: { id: parseInt(form.producto.id) }
      }
      if (esEdicion) await ventaService.actualizar(id, payload)
      else await ventaService.crear(payload)
      navigate('/ventas')
    } catch { setError('Error al guardar. Verifica los datos.') }
    finally { setLoading(false) }
  }

  const total = (parseFloat(form.precioUnitario) || 0) * (parseInt(form.cantidad) || 0)

  return (
    <Layout>
      <div className="page-header">
        <h1><i className={`bi ${esEdicion ? 'bi-pencil-square' : 'bi-plus-circle'}`}></i>
          {' '}{esEdicion ? 'Editar Venta' : 'Nueva Venta'}
        </h1>
      </div>
      <div className="form-card">
        {error && <div className="login-error mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group"><label>Fecha *</label><input type="date" value={form.fecha} onChange={e => set('fecha', e.target.value)} required /></div>
            <div className="form-group">
              <label>Estado</label>
              <select value={form.estado} onChange={e => set('estado', e.target.value)}>
                <option>PENDIENTE</option><option>COMPLETADO</option><option>CANCELADO</option>
              </select>
            </div>
            <div className="form-group">
              <label>Cliente *</label>
              <select value={form.cliente.id} onChange={e => set('cliente', { id: e.target.value })} required>
                <option value="">-- Seleccionar --</option>
                {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Producto *</label>
              <select value={form.producto.id} onChange={handleProductoChange} required>
                <option value="">-- Seleccionar --</option>
                {productos.map(p => <option key={p.id} value={p.id}>{p.nombre} (Stock: {p.stock})</option>)}
              </select>
            </div>
            <div className="form-group"><label>Precio Unitario (Bs) *</label><input type="number" step="0.01" value={form.precioUnitario} onChange={e => set('precioUnitario', e.target.value)} required /></div>
            <div className="form-group"><label>Cantidad *</label><input type="number" min="1" value={form.cantidad} onChange={e => set('cantidad', e.target.value)} required /></div>
            <div className="form-group full"><label>Total calculado</label><input readOnly value={`Bs ${total.toFixed(2)}`} style={{ background: '#f0f2f5', fontWeight: 700 }} /></div>
            <div className="form-group full"><label>Notas</label><textarea value={form.notas} onChange={e => set('notas', e.target.value)} rows={2} /></div>
          </div>
          <div className="form-actions">
            <button className="btn-primary" type="submit" disabled={loading}><i className="bi bi-check-lg"></i> {loading ? 'Guardando...' : 'Guardar'}</button>
            <Link to="/ventas" className="btn-secondary">Cancelar</Link>
          </div>
        </form>
      </div>
    </Layout>
  )
}
