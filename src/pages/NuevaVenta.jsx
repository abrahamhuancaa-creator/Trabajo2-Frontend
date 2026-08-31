import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

export default function NuevaVenta() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: POST /api/ventas
    window.history.back()
  }

  return (
    <Layout>
      <div className="page-header">
        <h1><i className="bi bi-receipt"></i> Nueva Venta</h1>
        <Link to="/ventas" className="btn-secondary">
          <i className="bi bi-arrow-left"></i> Volver
        </Link>
      </div>

      <section className="form-card">
        <div className="form-card-title">
          <i className="bi bi-receipt"></i> Datos de la venta
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="producto">Producto</label>
            <select id="producto" name="producto" required>
              <option value="">-- Seleccionar producto --</option>
              <option>CAM-001 — Camisa Oxford</option>
              <option>PAN-001 — Pantalón Chino</option>
              <option>CHA-001 — Chaqueta Casual</option>
              <option>CAM-002 — Polo Clásico</option>
              <option>PAN-002 — Jean Slim Fit</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="cantidad">Cantidad</label>
            <input type="number" id="cantidad" name="cantidad" placeholder="1" min="1" required />
          </div>
          <div className="form-group">
            <label htmlFor="cliente">Cliente</label>
            <select id="cliente" name="cliente" required>
              <option value="">-- Seleccionar cliente --</option>
              <option>Carlos Mamani</option>
              <option>Luis Quispe</option>
              <option>Pedro Flores</option>
              <option>José Rojas</option>
              <option>Marco Condori</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="fecha">Fecha</label>
            <input type="date" id="fecha" name="fecha" required />
          </div>
          <div className="form-group">
            <label htmlFor="metodo">Método de pago</label>
            <select id="metodo" name="metodo">
              <option>Efectivo</option>
              <option>Tarjeta</option>
              <option>Transferencia</option>
              <option>QR</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="notas">Notas</label>
            <textarea id="notas" name="notas" placeholder="Observaciones..."></textarea>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              <i className="bi bi-floppy"></i> Guardar
            </button>
            <Link to="/ventas" className="btn-cancel">
              <i className="bi bi-x-lg"></i> Cancelar
            </Link>
          </div>
        </form>
      </section>
    </Layout>
  )
}
