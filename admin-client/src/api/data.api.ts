import api from '@/api/axiosInterceptor'

const baseUrl = '/api'
export interface IGetPayload {
  source: string
}
export interface IGetOnePayload extends IGetPayload {
  id: string
}

export interface IUpdatePayload<T = any> extends IGetOnePayload {
  data: T
}

export interface ICreatePayload<T = any> extends IGetPayload {
  data: T
}

export const getAll = <T = any>({ source }: IGetPayload) => {
  return (api.get(`${baseUrl}/${source}`) as any as Promise<T[]>) || []
}

export const getOne = <T = any>({ source, id }: IGetOnePayload) => {
  return (api.get(`${baseUrl}/${source}/${id}`) as Promise<T>) || {}
}

export const updateOne = <T = any>({ source, id, data }: IUpdatePayload<T>) => {
  return api.patch(`${baseUrl}/${source}/${id}`, data)
}

export const create = <T = any>({ source, data }: ICreatePayload<T>) => {
  return api.post(`${baseUrl}/${source}`, data)
}

export const uploadImage = (source: string, img: any) => {
  const formData = new FormData()
  formData.append(source, img)
  return api.post(`api/photos/${source}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
