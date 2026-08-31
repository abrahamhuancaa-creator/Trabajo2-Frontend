import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [usuario, setUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: conectar con backend
    if (usuario === 'admin' && contrasena === '1234') {
      localStorage.setItem('token', 'demo-token')
      navigate('/dashboard')
    } else {
      setError('Usuario o contraseña incorrectos')
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <header className="login-header">
          <div className="login-logo">
            <i className="bi bi-bag-fill"></i>
          </div>
          <h1>StyleShop</h1>
          <p>Sistema de Gestión de Tienda</p>
        </header>

        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{ background: '#ffebee', color: '#c62828', padding: '0.6rem 0.85rem', borderRadius: '6px', fontSize: '0.82rem', marginBottom: '1rem' }}>
              <i className="bi bi-exclamation-circle"></i> {error}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text" id="usuario"
              placeholder="Ingresa tu usuario"
              value={usuario}
              onChange={e => setUsuario(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contrasena">Contraseña</label>
            <input
              type="password" id="contrasena"
              placeholder="••••••••"
              value={contrasena}
              onChange={e => setContrasena(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-login">
            <i className="bi bi-box-arrow-in-right"></i> Iniciar Sesión
          </button>
        </form>
      </div>
      <footer className="login-footer">
        <p>© 2026 StyleShop · Todos los derechos reservados</p>
      </footer>
    </div>
  )
}
