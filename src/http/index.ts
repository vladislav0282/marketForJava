/* eslint-disable no-param-reassign */
import axios from 'axios'

export const $host = axios.create({
  baseURL: 'http://localhost:8080',
})

export const $authHost = axios.create({
  baseURL: 'http://localhost:8080',
})

const authInterceptor = (config: any) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}

$authHost.interceptors.request.use(authInterceptor)
