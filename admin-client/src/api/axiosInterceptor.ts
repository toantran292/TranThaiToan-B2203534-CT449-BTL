import axios from 'axios'

export const getLocalToken = () => {
  const token = window.localStorage.getItem('token')
  return token
}

export const getLocalRefreshToken = () => {
  const token = window.localStorage.getItem('refreshToken')
  return token
}

const instanceAxios = axios.create({
  baseURL: process.env.VITE_APP_ENDPOINT,
  timeout: 300000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// instanceAxios.setToken = (token) => {
//   instanceAxios.defaults.headers['authorizations'] = `Beare ${token.acessToken}`
//   window.localStorage.setItem('token', token.acessToken)
//   window.localStorage.setItem('refreshToken', token.refreshToken)
// }
// // instance.setToken = (token: string) => {}

// instanceAxios.interceptors.response.use((response) => {
//   const { code, auto } = response.data

//   if (code == 401) {
//     if (auto == 'yes') {
//       return refreshToken().then((rs) => {
//         // const {token}
//       })
//     }
//   }
//   return response
// })

export default instanceAxios
