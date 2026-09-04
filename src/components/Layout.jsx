import { useState } from 'react'
import Subnav from './Subnav'

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="topbar">
        <div className="topbar-brand">
          <i className="bi bi-bag-fill"></i>
          <span className="hidden sm:inline">StyleShop</span>
        </div>
        <div className="topbar-spacer" />
        {/* Hamburger móvil */}
        <button
          className="md:hidden text-gray-500 text-xl p-1"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menú"
        >
          <i className={`bi ${menuOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
        </button>
        <div className="topbar-actions hidden md:flex">
          <i className="bi bi-bell"></i>
          <i className="bi bi-gear"></i>
          <div className="topbar-avatar">AD</div>
        </div>
      </header>

      {/* SUBNAV */}
      <Subnav mobileOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* MAIN */}
      <main className="page-content flex-1">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="page-footer">
        <p>© 2026 StyleShop · Sistema de Gestión</p>
      </footer>
    </div>
  )
}
