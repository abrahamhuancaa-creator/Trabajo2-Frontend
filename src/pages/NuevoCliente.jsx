import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import clienteService from '../services/clienteService'

export default function NuevoCliente() {
  const { id } = useParams()
  const navigate = useNavigate()
  const esEdicion = Boolean(id)
  const [form, setForm] = useState({ ci: '', nombre: '', correo: '', telefono: '', ciudad: '', notas: '', activo: true })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (esEdicion) clienteService.obtener(id).then(r =>
      setForm({ ci: r.data.ci || '', nombre: r.data.nombre || '', correo: r.data.correo || '', telefono: r.data.telefono || '', ciudad: r.data.ciudad || '', notas: r.data.notas || '', activo: r.data.activo ?? true })
    )
  }, [id])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async e => {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      if (esEdicion) await clienteService.actualizar(id, form)
      else await clienteService.crear(form)
      navigate('/clientes')
    } catch { setError('Error al guardar') } finally { setLoading(false) }
  }

  return (
    <Layout>
      <div className="page-header">
        <h1><i className={`bi ${esEdicion ? 'bi-pencil-square' : 'bi-plus-circle'}`}></i> {esEdicion ? 'Editar Cliente' : 'Nuevo Cliente'}</h1>
      </div>
      <div className="form-card">
        {error && <div className="login-error mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group"><label>CI</label><input value={form.ci} onChange={e => set('ci', e.target.value)} /></div>
            <div className="form-group"><label>Nombre *</label><input value={form.nombre} onChange={e => set('nombre', e.target.value)} required /></div>
            <div className="form-group"><label>Correo</label><input type="email" value={form.correo} onChange={e => set('correo', e.target.value)} /></div>
            <div className="form-group"><label>Teléfono</label><input value={form.telefono} onChange={e => set('telefono', e.target.value)} /></div>
            <div className="form-group"><label>Ciudad</label><input value={form.ciudad} onChange={e => set('ciudad', e.target.value)} /></div>
            <div className="form-group">
              <label>Estado</label>
              <select value={form.activo} onChange={e => set('activo', e.target.value === 'true')}>
                <option value="true">Activo</option><option value="false">Inactivo</option>
              </select>
            </div>
            <div className="form-group full"><label>Notas</label><textarea value={form.notas} onChange={e => set('notas', e.target.value)} rows={2} /></div>
          </div>
          <div className="form-actions">
            <button className="btn-primary" type="submit" disabled={loading}><i className="bi bi-check-lg"></i> {loading ? 'Guardando...' : 'Guardar'}</button>
            <Link to="/clientes" className="btn-secondary">Cancelar</Link>
          </div>
        </form>
      </div>
    </Layout>
  )
}
