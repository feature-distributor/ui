import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { AxiosLoading } from './loading'
import { STORAGE_AUTHORIZE_KEY, useAuthorization } from '~/composables/authorization'
import { ContentTypeEnum, RequestEnum } from '~#/http-enum'
import router from '~/router'

export interface ResponseBody<T = any> {
  code: number
  data?: T
  msg: string
}

export interface RequestConfigExtra {
  token?: boolean
  showMessage?: boolean
  loading?: boolean
}
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API ?? '/',
  timeout: 20000,
  headers: { 'Content-Type': ContentTypeEnum.JSON },
})
const axiosLoading = new AxiosLoading()
async function requestHandler(config: InternalAxiosRequestConfig & RequestConfigExtra): Promise<InternalAxiosRequestConfig> {
  const token = useAuthorization()

  if (token.value && config.token !== false)
    config.headers.set(STORAGE_AUTHORIZE_KEY, token.value)

  // 增加多语言的配置
  const { locale } = useI18nLocale()
  config.headers.set('Accept-Language', locale.value ?? 'zh-CN')
  if (config.loading)
    axiosLoading.addLoading()
  return config
}

function responseHandler(response: any): ResponseBody<any> | AxiosResponse<any> | Promise<any> | any {
  return response.data
}

function errorHandler(error: AxiosError): Promise<any> {
  const token = useAuthorization()
  const notification = useNotification()

  if (error.response) {
    const { data, status, statusText } = error.response as AxiosResponse<ResponseBody>
    const config = error.response.config as InternalAxiosRequestConfig & RequestConfigExtra
    if (status === 401) {
      if (config.showMessage !== false) {
        notification?.error({
          message: '401',
          description: data?.msg || statusText,
          duration: 3,
        })
      }
      /**
       * 这里处理清空用户信息和token的逻辑，后续扩展
       */
      token.value = null
      router
        .push({
          path: '/login',
          query: {
            redirect: router.currentRoute.value.fullPath,
          },
        })
        .then(() => { })
    }
    else if (status === 403) {
      if (config.showMessage !== false) {
        notification?.error({
          message: '暂无权限',
          description: data?.msg || statusText,
          duration: 3,
        })
      }
      router
        .push({
          path: '/403',
        })
        .then(() => { })
    }
    else if (status === 500) {
      if (config.showMessage !== false) {
        notification?.error({
          message: '服务器错误',
          description: data?.msg || statusText,
          duration: 3,
        })
      }
      router
        .push({
          path: '/500',
        })
        .then(() => { })
    }
    else if (status === 400) {
      if (config.showMessage !== false) {
        notification?.error({
          message: '参数错误',
          description: data?.msg || statusText,
          duration: 3,
        })
      }
    }
    else {
      if (config.showMessage !== false) {
        notification?.error({
          message: '服务错误',
          description: data?.msg || statusText,
          duration: 3,
        })
      }
    }
  }
  return Promise.reject(error)
}
interface AxiosOptions<T> {
  url: string
  params?: T
  data?: T
}
instance.interceptors.request.use(requestHandler)

instance.interceptors.response.use(responseHandler, errorHandler)

export default instance
function instancePromise<R = any, T = any>(options: AxiosOptions<T> & RequestConfigExtra): Promise<ResponseBody<R>> {
  const { loading } = options
  return new Promise((resolve, reject) => {
    instance.request(options).then((res) => {
      resolve(res as any)
    }).catch((e: Error | AxiosError) => {
      reject(e)
    })
      .finally(() => {
        if (loading)
          axiosLoading.closeLoading()
      })
  })
}
export function useGet<R = any, T = any>(url: string, params?: T, config?: AxiosRequestConfig & RequestConfigExtra): Promise<ResponseBody<R>> {
  const options = {
    url,
    params,
    method: RequestEnum.GET,
    ...config,
  }
  return instancePromise<R, T>(options)
}

export function usePost<R = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig & RequestConfigExtra): Promise<ResponseBody<R>> {
  const options = {
    url,
    data,
    method: RequestEnum.POST,
    ...config,
  }
  return instancePromise<R, T>(options)
}

export function usePut<R = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig & RequestConfigExtra): Promise<ResponseBody<R>> {
  const options = {
    url,
    data,
    method: RequestEnum.PUT,
    ...config,
  }
  return instancePromise<R, T>(options)
}

export function useDelete<R = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig & RequestConfigExtra): Promise<ResponseBody<R>> {
  const options = {
    url,
    data,
    method: RequestEnum.DELETE,
    ...config,
  }
  return instancePromise<R, T>(options)
}
