import api from '@/api/axiosInterceptor'
import type { AxiosResponse } from 'axios'

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

export const getAll = ({ source }: IGetPayload) => {
  return api.get(`/${source}`)
}

export const getOne = ({ source, id }: IGetOnePayload) => {
  return api.get(`/${source}/${id}`)
}

export const updateOne: <T = any>(
  payload: IUpdatePayload<T>
) => Promise<AxiosResponse<any, any>> = ({ source, id, data }) => {
  return api.patch(`/${source}/${id}`, {
    data
  })
}

export const create: <T = any>(payload: ICreatePayload<T>) => Promise<AxiosResponse<any, any>> = ({
  source,
  data
}) => {
  return api.patch(`/${source}`, {
    data
  })
}
