import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

export default function DetalleVenta() {
  return (
    <Layout>
      <div className="page-header">
        <h1><i className="bi bi-receipt"></i> Detalle de Venta</h1>
        <div className="page-actions">
          <Link to="/ventas" className="btn-secondary"><i className="bi bi-arrow-left"></i> Volver</Link>
          <button className="btn-primary" onClick={() => window.print()}>
            <i className="bi bi-printer"></i> Imprimir
          </button>
        </div>
      </div>

      <div className="order-header">
        <div>
          <div className="order-id">
            Orden #VTA-0005
            <span>Registrada el 25/08/2026 a las 10:42 am</span>
          </div>
        </div>
        <span className="badge badge-info" style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }}>
          <i className="bi bi-arrow-repeat"></i> En proceso
        </span>
      </div>

      <div className="detail-grid">
        <div className="detail-card">
          <div className="detail-card-title"><i className="bi bi-box-seam"></i> Producto</div>
          {[['SKU','PAN-002'],['Nombre','Jean Slim Fit'],['Categoría','Pantalones'],['Color','Índigo'],['Talla','32'],['Precio unitario','$75.00'],['Cantidad','2']].map(([l,v]) => (
            <div className="detail-row" key={l}>
              <span className="detail-label">{l}</span>
              <span className="detail-value">{v}</span>
            </div>
          ))}
          <div className="detail-row total-row">
            <span className="detail-label">Total</span>
            <span className="detail-value">$150.00</span>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-card-title"><i className="bi bi-person"></i> Cliente</div>
          {[['CI','12345682'],['Nombre','Marco Condori'],['Correo','marco@mail.com'],['Teléfono','74567890'],['Ciudad','Potosí']].map(([l,v]) => (
            <div className="detail-row" key={l}>
              <span className="detail-label">{l}</span>
              <span className="detail-value">{v}</span>
            </div>
          ))}
        </div>

        <div className="detail-card">
          <div className="detail-card-title"><i className="bi bi-credit-card"></i> Pago</div>
          {[['Método','Transferencia'],['Fecha de pago','25/08/2026'],['N° Referencia','TRF-2026-0089']].map(([l,v]) => (
            <div className="detail-row" key={l}>
              <span className="detail-label">{l}</span>
              <span className="detail-value">{v}</span>
            </div>
          ))}
          <div className="detail-row">
            <span className="detail-label">Estado</span>
            <span className="detail-value"><span className="badge badge-warning">Pendiente</span></span>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-card-title"><i className="bi bi-chat-left-text"></i> Notas</div>
          {[['Observaciones','Entrega a domicilio'],['Vendedor','Admin'],['Sucursal','Principal - La Paz']].map(([l,v]) => (
            <div className="detail-row" key={l}>
              <span className="detail-label">{l}</span>
              <span className="detail-value">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
