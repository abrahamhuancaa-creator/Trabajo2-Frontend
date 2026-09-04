import api from './api'

const productoService = {
  listar:    ()           => api.get('/productos'),
  obtener:   (id)         => api.get(`/productos/${id}`),
  crear:     (datos)      => api.post('/productos', datos),
  actualizar:(id, datos)  => api.put(`/productos/${id}`, datos),
  eliminar:  (id)         => api.delete(`/productos/${id}`),
}

export default productoService
