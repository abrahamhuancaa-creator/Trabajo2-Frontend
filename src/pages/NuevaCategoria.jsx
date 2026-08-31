import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

export default function NuevaCategoria() {
  const handleSubmit = (e) => { e.preventDefault(); window.history.back() }
  return (
    <Layout>
      <div className="page-header">
        <h1><i className="bi bi-tags"></i> Nueva Categoría</h1>
        <Link to="/categorias" className="btn-secondary"><i className="bi bi-arrow-left"></i> Volver</Link>
      </div>
      <section className="form-card">
        <div className="form-card-title"><i className="bi bi-tags"></i> Datos de la categoría</div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input type="text" id="nombre" placeholder="Ej: Camisas" required />
          </div>
          <div className="form-group">
            <label htmlFor="descripcion">Descripción</label>
            <textarea id="descripcion" placeholder="Descripción de la categoría..."></textarea>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary"><i className="bi bi-floppy"></i> Guardar</button>
            <Link to="/categorias" className="btn-cancel"><i className="bi bi-x-lg"></i> Cancelar</Link>
          </div>
        </form>
      </section>
    </Layout>
  )
}
