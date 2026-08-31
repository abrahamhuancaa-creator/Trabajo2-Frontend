import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

export default function NuevoCliente() {
  const handleSubmit = (e) => { e.preventDefault(); window.history.back() }
  return (
    <Layout>
      <div className="page-header">
        <h1><i className="bi bi-person-plus"></i> Nuevo Cliente</h1>
        <Link to="/clientes" className="btn-secondary"><i className="bi bi-arrow-left"></i> Volver</Link>
      </div>
      <section className="form-card">
        <div className="form-card-title"><i className="bi bi-person-plus"></i> Datos del cliente</div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="ci">CI / Cédula</label>
            <input type="text" id="ci" placeholder="Ej: 12345678" />
          </div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo</label>
            <input type="text" id="nombre" placeholder="Ej: Carlos Mamani" required />
          </div>
          <div className="form-group">
            <label htmlFor="correo">Correo electrónico</label>
            <input type="email" id="correo" placeholder="correo@ejemplo.com" />
          </div>
          <div className="form-group">
            <label htmlFor="telefono">Teléfono</label>
            <input type="tel" id="telefono" placeholder="Ej: 70012345" />
          </div>
          <div className="form-group">
            <label htmlFor="ciudad">Ciudad</label>
            <input type="text" id="ciudad" placeholder="Ej: La Paz" />
          </div>
          <div className="form-group">
            <label htmlFor="notas">Notas</label>
            <textarea id="notas" placeholder="Información adicional..."></textarea>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary"><i className="bi bi-floppy"></i> Guardar</button>
            <Link to="/clientes" className="btn-cancel"><i className="bi bi-x-lg"></i> Cancelar</Link>
          </div>
        </form>
      </section>
    </Layout>
  )
}
