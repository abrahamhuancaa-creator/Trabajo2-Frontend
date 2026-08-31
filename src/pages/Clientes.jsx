import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const clientes = [
  { id: 1, ci: '12345678', nombre: 'Carlos Mamani', correo: 'carlos@mail.com', telefono: '70012345', ciudad: 'La Paz',      estado: 'Activo',   badge: 'success' },
  { id: 2, ci: '12345679', nombre: 'Luis Quispe',   correo: 'luis@mail.com',   telefono: '71234567', ciudad: 'Cochabamba', estado: 'Activo',   badge: 'success' },
  { id: 3, ci: '12345680', nombre: 'Pedro Flores',  correo: 'pedro@mail.com',  telefono: '72345678', ciudad: 'Santa Cruz', estado: 'Activo',   badge: 'success' },
  { id: 4, ci: '12345681', nombre: 'José Rojas',    correo: 'jose@mail.com',   telefono: '73456789', ciudad: 'Oruro',      estado: 'Activo',   badge: 'success' },
  { id: 5, ci: '12345682', nombre: 'Marco Condori', correo: 'marco@mail.com',  telefono: '74567890', ciudad: 'Potosí',     estado: 'Inactivo', badge: 'warning' },
]

export default function Clientes() {
  return (
    <Layout>
      <div className="page-header">
        <h1><i className="bi bi-people"></i> Clientes</h1>
        <div className="page-actions">
          <Link to="/clientes/nuevo" className="btn-primary">
            <i className="bi bi-plus-lg"></i> Nuevo Cliente
          </Link>
        </div>
      </div>

      <section className="table-section">
        <div className="table-toolbar">
          <span className="table-toolbar-title">Lista de clientes</span>
        </div>
        <table>
          <thead>
            <tr><th>#</th><th>CI</th><th>Nombre</th><th>Correo</th><th>Teléfono</th><th>Ciudad</th><th>Estado</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {clientes.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td><td>{c.ci}</td><td>{c.nombre}</td>
                <td>{c.correo}</td><td>{c.telefono}</td><td>{c.ciudad}</td>
                <td><span className={`badge badge-${c.badge}`}>{c.estado}</span></td>
                <td style={{ display: 'flex', gap: '0.3rem' }}>
                  <Link to={`/clientes/${c.id}/editar`} className="btn-sm btn-edit" title="Editar">
                    <i className="bi bi-pencil"></i>
                  </Link>
                  <button className="btn-sm btn-delete" title="Eliminar">
                    <i className="bi bi-trash3"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Layout>
  )
}
