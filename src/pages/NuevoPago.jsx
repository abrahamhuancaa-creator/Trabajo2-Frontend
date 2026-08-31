import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

export default function NuevoPago() {
  const handleSubmit = (e) => { e.preventDefault(); window.history.back() }
  return (
    <Layout>
      <div className="page-header">
        <h1><i className="bi bi-credit-card"></i> Registrar Pago</h1>
        <Link to="/pagos" className="btn-secondary"><i className="bi bi-arrow-left"></i> Volver</Link>
      </div>
      <section className="form-card">
        <div className="form-card-title"><i className="bi bi-credit-card"></i> Datos del pago</div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="venta">N° de Venta</label>
            <select id="venta" required>
              <option value="">-- Seleccionar venta --</option>
              <option>VTA-0001 — Carlos Mamani — $90.00</option>
              <option>VTA-0002 — Luis Quispe — $60.00</option>
              <option>VTA-0003 — Pedro Flores — $95.00</option>
              <option>VTA-0004 — José Rojas — $90.00</option>
              <option>VTA-0005 — Marco Condori — $150.00</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="monto">Monto ($)</label>
            <input type="number" id="monto" placeholder="0.00" min="0" step="0.01" required />
          </div>
          <div className="form-group">
            <label htmlFor="metodo">Método de pago</label>
            <select id="metodo" required>
              <option value="">-- Seleccionar --</option>
              <option>Efectivo</option>
              <option>Tarjeta de crédito</option>
              <option>Transferencia bancaria</option>
              <option>QR</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="referencia">N° Referencia</label>
            <input type="text" id="referencia" placeholder="Opcional" />
          </div>
          <div className="form-group">
            <label htmlFor="fecha">Fecha de pago</label>
            <input type="date" id="fecha" required />
          </div>
          <div className="form-group">
            <label htmlFor="estado">Estado</label>
            <select id="estado">
              <option>Pagado</option>
              <option>Pendiente</option>
              <option>Sin pagar</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="notas">Notas</label>
            <textarea id="notas" placeholder="Observaciones del pago..."></textarea>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary"><i className="bi bi-floppy"></i> Guardar</button>
            <Link to="/pagos" className="btn-cancel"><i className="bi bi-x-lg"></i> Cancelar</Link>
          </div>
        </form>
      </section>
    </Layout>
  )
}
