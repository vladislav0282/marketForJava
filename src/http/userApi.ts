import { jwtDecode } from 'jwt-decode'
import { $authHost, $host } from './index'

// С правами (ролью) администратора
// export const registration = async (email: string, password: string, role: string) => {
//   const { data } = await $host.post('api/v1/user/registration', { email, password, role: 'ADMIN' })
//   localStorage.setItem('token', data.token)
//   return jwtDecode(data.token)
// }

export const registration = async (
  username: string,
  password: string,
  confirmPassword: string,
  name: string,
) => {
  const { data } = await $host.post('auth/registration', {
    username,
    password,
    confirmPassword,
    name: 'ivan',
  })
  // localStorage.setItem('token', data.token)
  // return jwtDecode(data.token)
}

// export const registration = async (
//   username: string,
//   password: string,
//   confirmPassword: string,
//   name: string,
// ) => {
//   const { data } = await $host.post('auth/registration', {
//     username,
//     password,
//     confirmPassword,
//     name,
//   })
//   console.log('Registration response:', data)
//   if (!data.token || typeof data.token !== 'string') {
//     throw new Error('Invalid token received from server')
//   }
//   localStorage.setItem('token', data.token)
//   return jwtDecode(data.token)
// }

export const login = async (username: string, password: string) => {
  const { data } = await $host.post('auth/login', { username, password })
  localStorage.setItem('token', data.token)
  return jwtDecode(data.token)
}

// export const getUserByUsername = async (username: string) => {
//   const params: any = {
//     username,
//   }

//   if (username) {
//     params.username = username
//   }

//   const { data } = await $host.get('users/getUsername', { params })
//   return data
// }

export const check = async () => {
  const { data } = await $authHost.get('auth/checkauth')
  return data

  // localStorage.setItem('token', data.token)
}

export const checkRole = async () => {
  const { data } = await $authHost.get('auth/checkrole')
  return data
  //
  // localStorage.setItem('token', data.token)
  // return jwtDecode(data.token)
}

export const getUserByUsername = async (username: string) => {
  const { data } = await $host.get(`users/getUsername/${username}`)
  return data
}
