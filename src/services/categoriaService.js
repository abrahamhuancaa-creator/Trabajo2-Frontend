import api from './api'

const categoriaService = {
  listar:    ()           => api.get('/categorias'),
  obtener:   (id)         => api.get(`/categorias/${id}`),
  crear:     (datos)      => api.post('/categorias', datos),
  actualizar:(id, datos)  => api.put(`/categorias/${id}`, datos),
  eliminar:  (id)         => api.delete(`/categorias/${id}`),
}

export default categoriaService
