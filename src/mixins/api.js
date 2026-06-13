import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'https://www.back.ngcis.com/api'

const API = axios.create({
  baseURL: BASE_URL,

  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

API.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear()

      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

export default API
