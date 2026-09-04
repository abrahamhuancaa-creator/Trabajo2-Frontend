import api from './api'

const clienteService = {
  listar:    ()           => api.get('/clientes'),
  obtener:   (id)         => api.get(`/clientes/${id}`),
  crear:     (datos)      => api.post('/clientes', datos),
  actualizar:(id, datos)  => api.put(`/clientes/${id}`, datos),
  eliminar:  (id)         => api.delete(`/clientes/${id}`),
}

export default clienteService
