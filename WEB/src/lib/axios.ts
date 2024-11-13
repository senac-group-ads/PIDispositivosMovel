import axios, { AxiosInstance } from 'axios'
import { env } from '@/env'
import { AppErrors } from './appErrors'

type SignOut = () => void;

type ApiInstanceProps = AxiosInstance & {
  registerIntercepetTokenMeneger: (signOut: SignOut) => () => void
}

export const api = axios.create({
    baseURL: env.VITE_API_URL,
}) as ApiInstanceProps

if (env.VITE_ENABLE_API_DELAY) {
    api.interceptors.request.use(async (config) => {
      await new Promise((resolve) =>
        setTimeout(resolve, Math.round(Math.random() * 2000)),
      )
      return config
    })
}

api.registerIntercepetTokenMeneger = signOut => {
  const InterceptTokenMeneger = api.interceptors.response.use(response => response, requestError => {
    if(requestError?.response?.status === 401) {
      if(requestError.response.data.message === 'Unauthorized.' || requestError.response.data.message === 'invalid') {
          signOut()
      }
  }
    if(requestError.response && requestError.response.data) {
      return Promise.reject(new AppErrors(requestError.response.data.message))
    } else {
      return Promise.reject(requestError)
    }
  })

  return () => {
    api.interceptors.response.eject(InterceptTokenMeneger)
  }
}
