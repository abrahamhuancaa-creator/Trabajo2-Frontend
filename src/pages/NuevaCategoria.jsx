import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import categoriaService from '../services/categoriaService'

export default function NuevaCategoria() {
  const { id } = useParams()
  const navigate = useNavigate()
  const esEdicion = Boolean(id)
  const [form, setForm] = useState({ nombre: '', descripcion: '', activa: true })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (esEdicion) categoriaService.obtener(id).then(r =>
      setForm({ nombre: r.data.nombre, descripcion: r.data.descripcion || '', activa: r.data.activa ?? true })
    )
  }, [id])

  const handleSubmit = async e => {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      if (esEdicion) await categoriaService.actualizar(id, form)
      else await categoriaService.crear(form)
      navigate('/categorias')
    } catch { setError('Error al guardar') } finally { setLoading(false) }
  }

  return (
    <Layout>
      <div className="page-header">
        <h1><i className={`bi ${esEdicion ? 'bi-pencil-square' : 'bi-plus-circle'}`}></i> {esEdicion ? 'Editar Categoría' : 'Nueva Categoría'}</h1>
      </div>
      <div className="form-card">
        {error && <div className="login-error mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group"><label>Nombre *</label><input value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} required /></div>
            <div className="form-group">
              <label>Estado</label>
              <select value={form.activa} onChange={e => setForm(f => ({ ...f, activa: e.target.value === 'true' }))}>
                <option value="true">Activa</option><option value="false">Inactiva</option>
              </select>
            </div>
            <div className="form-group full"><label>Descripción</label><textarea value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} rows={3} /></div>
          </div>
          <div className="form-actions">
            <button className="btn-primary" type="submit" disabled={loading}><i className="bi bi-check-lg"></i> {loading ? 'Guardando...' : 'Guardar'}</button>
            <Link to="/categorias" className="btn-secondary">Cancelar</Link>
          </div>
        </form>
      </div>
    </Layout>
  )
}
