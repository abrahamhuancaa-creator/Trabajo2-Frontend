import Subnav from './Subnav'

export default function Layout({ children }) {
  return (
    <>
      <header className="topbar">
        <div className="topbar-brand">
          <i className="bi bi-bag-fill"></i> StyleShop
        </div>
        <div className="topbar-spacer"></div>
        <div className="topbar-actions">
          <i className="bi bi-bell"></i>
          <i className="bi bi-gear"></i>
          <div className="topbar-avatar">AD</div>
        </div>
      </header>

      <Subnav />

      <main className="page-content">
        {children}
      </main>

      <footer className="page-footer">
        <p>© 2026 StyleShop · Sistema de Gestión</p>
      </footer>
    </>
  )
}
