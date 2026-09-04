import { NavLink, useNavigate } from 'react-router-dom'

const links = [
  { to: '/dashboard',  icon: 'bi-speedometer2', label: 'Dashboard' },
  { to: '/productos',  icon: 'bi-box-seam',      label: 'Productos' },
  { to: '/ventas',     icon: 'bi-receipt',        label: 'Ventas' },
  { to: '/categorias', icon: 'bi-tags',           label: 'Categorías' },
  { to: '/clientes',   icon: 'bi-people',         label: 'Clientes' },
  { to: '/pagos',      icon: 'bi-credit-card',    label: 'Pagos' },
]

export default function Subnav({ mobileOpen, onClose }) {
  const navigate = useNavigate()

  const handleSalir = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className={`subnav ${mobileOpen ? 'flex-col items-start h-auto py-2' : ''} md:flex-row`}>
      {links.map(({ to, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => `subnav-link ${isActive ? 'active' : ''}`}
          onClick={onClose}
        >
          <i className={`bi ${icon}`}></i>
          <span>{label}</span>
        </NavLink>
      ))}
      <div className="subnav-spacer" />
      <button className="btn-salir" onClick={handleSalir}>
        <i className="bi bi-box-arrow-right"></i>
        <span>Salir</span>
      </button>
    </nav>
  )
}
