import api from './api'

const ventaService = {
  listar:    ()           => api.get('/ventas'),
  obtener:   (id)         => api.get(`/ventas/${id}`),
  crear:     (datos)      => api.post('/ventas', datos),
  actualizar:(id, datos)  => api.put(`/ventas/${id}`, datos),
  eliminar:  (id)         => api.delete(`/ventas/${id}`),
}

export default ventaService
