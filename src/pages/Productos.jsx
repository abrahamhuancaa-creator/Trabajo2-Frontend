import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import productoService from '../services/productoService'

export default function Productos() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)

  const cargar = async () => {
    try {
      const { data } = await productoService.listar()
      setProductos(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { cargar() }, [])

  const eliminar = async id => {
    if (!confirm('¿Eliminar este producto?')) return
    await productoService.eliminar(id)
    setProductos(prev => prev.filter(p => p.id !== id))
  }

  return (
    <Layout>
      <div className="page-header">
        <h1><i className="bi bi-box-seam"></i> Productos</h1>
        <div className="page-actions">
          <Link to="/productos/nuevo" className="btn-primary">
            <i className="bi bi-plus-lg"></i> Nuevo Producto
          </Link>
        </div>
      </div>

      <section className="table-section">
        <div className="table-toolbar">
          <span className="table-toolbar-title">Lista de productos ({productos.length})</span>
        </div>
        <div className="table-wrapper">
          {loading ? (
            <p className="p-4 text-center text-gray-400">Cargando...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th><th>SKU</th><th>Nombre</th><th>Color</th>
                  <th>Categoría</th><th>Talla</th><th>Precio</th><th>Stock</th>
                  <th>Estado</th><th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.length === 0 ? (
                  <tr><td colSpan={10} className="text-center p-4 text-gray-400">Sin productos</td></tr>
                ) : productos.map(p => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.sku}</td>
                    <td>{p.nombre}</td>
                    <td>{p.color}</td>
                    <td>{p.categoria?.nombre || '—'}</td>
                    <td>{p.talla}</td>
                    <td>Bs {p.precio?.toFixed(2)}</td>
                    <td>{p.stock}</td>
                    <td>
                      <span className={`badge ${p.disponible ? 'badge-success' : 'badge-danger'}`}>
                        {p.disponible ? 'Disponible' : 'No disponible'}
                      </span>
                    </td>
                    <td style={{ display: 'flex', gap: '0.3rem' }}>
                      <Link to={`/productos/${p.id}/editar`} className="btn-sm btn-edit" title="Editar">
                        <i className="bi bi-pencil"></i>
                      </Link>
                      <button className="btn-sm btn-delete" title="Eliminar" onClick={() => eliminar(p.id)}>
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
