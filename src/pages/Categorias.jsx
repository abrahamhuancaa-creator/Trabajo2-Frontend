import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import categoriaService from '../services/categoriaService'

export default function Categorias() {
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(true)

  const cargar = async () => {
    try { const { data } = await categoriaService.listar(); setCategorias(data) }
    catch (e) { console.error(e) } finally { setLoading(false) }
  }
  useEffect(() => { cargar() }, [])

  const eliminar = async id => {
    if (!confirm('¿Eliminar esta categoría?')) return
    await api.delete(`/categorias/${id}`)
    setCategorias(prev => prev.filter(c => c.id !== id))
  }

  return (
    <Layout>
      <div className="page-header">
        <h1><i className="bi bi-tags"></i> Categorías</h1>
        <div className="page-actions">
          <Link to="/categorias/nueva" className="btn-primary">
            <i className="bi bi-plus-lg"></i> Nueva Categoría
          </Link>
        </div>
      </div>
      <section className="table-section">
        <div className="table-toolbar">
          <span className="table-toolbar-title">Lista de categorías ({categorias.length})</span>
        </div>
        <div className="table-wrapper">
          {loading ? <p className="p-4 text-center">Cargando...</p> : (
            <table>
              <thead><tr><th>#</th><th>Nombre</th><th>Descripción</th><th>Estado</th><th>Acciones</th></tr></thead>
              <tbody>
                {categorias.length === 0
                  ? <tr><td colSpan={5} className="text-center p-4 text-gray-400">Sin categorías</td></tr>
                  : categorias.map(c => (
                    <tr key={c.id}>
                      <td>{c.id}</td><td>{c.nombre}</td><td>{c.descripcion}</td>
                      <td><span className={`badge ${c.activa ? 'badge-success' : 'badge-danger'}`}>{c.activa ? 'Activa' : 'Inactiva'}</span></td>
                      <td style={{ display: 'flex', gap: '0.3rem' }}>
                        <Link to={`/categorias/${c.id}/editar`} className="btn-sm btn-edit"><i className="bi bi-pencil"></i></Link>
                        <button className="btn-sm btn-delete" onClick={() => eliminar(c.id)}><i className="bi bi-trash3"></i></button>
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
