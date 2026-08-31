import { NavLink, useNavigate } from 'react-router-dom'

const links = [
  { to: '/dashboard', icon: 'bi-speedometer2', label: 'Inicio' },
  { to: '/productos', icon: 'bi-box-seam', label: 'Productos' },
  { to: '/ventas', icon: 'bi-receipt', label: 'Ventas' },
  { to: '/categorias', icon: 'bi-tags', label: 'Categorías' },
  { to: '/clientes', icon: 'bi-people', label: 'Clientes' },
  { to: '/pagos', icon: 'bi-credit-card', label: 'Pagos' },
]

export default function Subnav() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="subnav">
      <div className="subnav-inner">
        {links.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            <i className={`bi ${icon}`}></i> {label}
          </NavLink>
        ))}
        <button className="subnav-end" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i> Salir
        </button>
      </div>
    </nav>
  )
}
