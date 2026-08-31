import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

export default function NuevoProducto() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: POST /api/productos
    window.history.back()
  }

  return (
    <Layout>
      <div className="page-header">
        <h1><i className="bi bi-box-seam"></i> Nuevo Producto</h1>
        <Link to="/productos" className="btn-secondary">
          <i className="bi bi-arrow-left"></i> Volver
        </Link>
      </div>

      <section className="form-card">
        <div className="form-card-title">
          <i className="bi bi-box-seam"></i> Información del producto
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="sku">Código SKU</label>
            <input type="text" id="sku" name="sku" placeholder="Ej: CAM-001" />
          </div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre del producto</label>
            <input type="text" id="nombre" name="nombre" placeholder="Ej: Camisa Oxford Blanca" required />
          </div>
          <div className="form-group">
            <label htmlFor="color">Color</label>
            <input type="text" id="color" name="color" placeholder="Ej: Blanco, Negro, Azul" />
          </div>
          <div className="form-group">
            <label htmlFor="categoria">Categoría</label>
            <select id="categoria" name="categoria">
              <option value="">-- Seleccionar --</option>
              <option>Camisas</option>
              <option>Pantalones</option>
              <option>Chaquetas</option>
              <option>Accesorios</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="talla">Talla</label>
            <select id="talla" name="talla">
              <option>XS</option><option>S</option><option>M</option>
              <option>L</option><option>XL</option><option>XXL</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="precio">Precio ($)</label>
            <input type="number" id="precio" name="precio" placeholder="0.00" min="0" step="0.01" required />
          </div>
          <div className="form-group">
            <label htmlFor="stock">Stock</label>
            <input type="number" id="stock" name="stock" placeholder="0" min="0" required />
          </div>
          <div className="form-group">
            <label htmlFor="descripcion">Descripción</label>
            <textarea id="descripcion" name="descripcion" placeholder="Descripción del producto..."></textarea>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              <i className="bi bi-floppy"></i> Guardar
            </button>
            <Link to="/productos" className="btn-cancel">
              <i className="bi bi-x-lg"></i> Cancelar
            </Link>
          </div>
        </form>
      </section>
    </Layout>
  )
}
