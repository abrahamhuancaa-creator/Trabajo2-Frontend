import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import clienteService from '../services/clienteService'

export default function Clientes() {
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)

  const cargar = async () => {
    try { const { data } = await clienteService.listar(); setClientes(data) }
    catch (e) { console.error(e) } finally { setLoading(false) }
  }
  useEffect(() => { cargar() }, [])

  const eliminar = async id => {
    if (!confirm('¿Eliminar este cliente?')) return
    await api.delete(`/clientes/${id}`)
    setClientes(prev => prev.filter(c => c.id !== id))
  }

  return (
    <Layout>
      <div className="page-header">
        <h1><i className="bi bi-people"></i> Clientes</h1>
        <div className="page-actions">
          <Link to="/clientes/nuevo" className="btn-primary"><i className="bi bi-plus-lg"></i> Nuevo Cliente</Link>
        </div>
      </div>
      <section className="table-section">
        <div className="table-toolbar">
          <span className="table-toolbar-title">Lista de clientes ({clientes.length})</span>
        </div>
        <div className="table-wrapper">
          {loading ? <p className="p-4 text-center">Cargando...</p> : (
            <table>
              <thead><tr><th>#</th><th>CI</th><th>Nombre</th><th>Correo</th><th>Teléfono</th><th>Ciudad</th><th>Estado</th><th>Acciones</th></tr></thead>
              <tbody>
                {clientes.length === 0
                  ? <tr><td colSpan={8} className="text-center p-4">Sin clientes</td></tr>
                  : clientes.map(c => (
                    <tr key={c.id}>
                      <td>{c.id}</td><td>{c.ci}</td><td>{c.nombre}</td><td>{c.correo}</td>
                      <td>{c.telefono}</td><td>{c.ciudad}</td>
                      <td><span className={`badge ${c.activo ? 'badge-success' : 'badge-danger'}`}>{c.activo ? 'Activo' : 'Inactivo'}</span></td>
                      <td style={{ display: 'flex', gap: '0.3rem' }}>
                        <Link to={`/clientes/${c.id}/editar`} className="btn-sm btn-edit"><i className="bi bi-pencil"></i></Link>
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
