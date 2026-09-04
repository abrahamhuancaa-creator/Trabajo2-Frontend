import api from './api'

const pagoService = {
  listar:    ()           => api.get('/pagos'),
  obtener:   (id)         => api.get(`/pagos/${id}`),
  crear:     (datos)      => api.post('/pagos', datos),
  actualizar:(id, datos)  => api.put(`/pagos/${id}`, datos),
  eliminar:  (id)         => api.delete(`/pagos/${id}`),
}

export default pagoService
