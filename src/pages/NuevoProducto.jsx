import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import productoService from '../services/productoService'
import categoriaService from '../services/categoriaService'

export default function NuevoProducto() {
  const { id } = useParams()
  const navigate = useNavigate()
  const esEdicion = Boolean(id)

  const [categorias, setCategorias] = useState([])
  const [form, setForm] = useState({
    sku: '', nombre: '', color: '', talla: '', descripcion: '',
    precio: '', stock: '', disponible: true, categoria: { id: '' }
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    categoriaService.listar().then(r => setCategorias(r.data))
    if (esEdicion) {
      productoService.obtener(id).then(r => {
        const p = r.data
        setForm({
          sku: p.sku || '', nombre: p.nombre || '', color: p.color || '',
          talla: p.talla || '', descripcion: p.descripcion || '',
          precio: p.precio || '', stock: p.stock || '',
          disponible: p.disponible ?? true,
          categoria: { id: p.categoria?.id || '' }
        })
      })
    }
  }, [id])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async e => {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      const payload = {
        ...form,
        precio: parseFloat(form.precio),
        stock: parseInt(form.stock),
        categoria: form.categoria.id ? { id: parseInt(form.categoria.id) } : null
      }
      if (esEdicion) await productoService.actualizar(id, payload)
      else await productoService.crear(payload)
      navigate('/productos')
    } catch { setError('Error al guardar. Verifica los datos.') }
    finally { setLoading(false) }
  }

  return (
    <Layout>
      <div className="page-header">
        <h1><i className={`bi ${esEdicion ? 'bi-pencil-square' : 'bi-plus-circle'}`}></i>
          {' '}{esEdicion ? 'Editar Producto' : 'Nuevo Producto'}
        </h1>
      </div>
      <div className="form-card">
        {error && <div className="login-error mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group"><label>SKU</label><input value={form.sku} onChange={e => set('sku', e.target.value)} placeholder="CAM-001" /></div>
            <div className="form-group"><label>Nombre *</label><input value={form.nombre} onChange={e => set('nombre', e.target.value)} required /></div>
            <div className="form-group"><label>Color</label><input value={form.color} onChange={e => set('color', e.target.value)} /></div>
            <div className="form-group"><label>Talla</label><input value={form.talla} onChange={e => set('talla', e.target.value)} /></div>
            <div className="form-group"><label>Precio (Bs) *</label><input type="number" step="0.01" value={form.precio} onChange={e => set('precio', e.target.value)} required /></div>
            <div className="form-group"><label>Stock *</label><input type="number" value={form.stock} onChange={e => set('stock', e.target.value)} required /></div>
            <div className="form-group">
              <label>Categoría</label>
              <select value={form.categoria.id} onChange={e => set('categoria', { id: e.target.value })}>
                <option value="">-- Sin categoría --</option>
                {categorias.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Disponible</label>
              <select value={form.disponible} onChange={e => set('disponible', e.target.value === 'true')}>
                <option value="true">Sí</option><option value="false">No</option>
              </select>
            </div>
            <div className="form-group full"><label>Descripción</label><textarea value={form.descripcion} onChange={e => set('descripcion', e.target.value)} rows={3} /></div>
          </div>
          <div className="form-actions">
            <button className="btn-primary" type="submit" disabled={loading}><i className="bi bi-check-lg"></i> {loading ? 'Guardando...' : 'Guardar'}</button>
            <Link to="/productos" className="btn-secondary">Cancelar</Link>
          </div>
        </form>
      </div>
    </Layout>
  )
}
