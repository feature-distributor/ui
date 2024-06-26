export interface LoginParams {
  username: string
  password: string
}

export interface LoginResultModel {
  token: string
}

export function loginApi(params: LoginParams) {
  return usePost<LoginResultModel, LoginParams>('/user/login/v1', params, {
    // 设置为false的时候不会携带token
    token: false,
    // 是否开启全局请求loading
    loading: true,
    showMessage: false,
  })
}

export function logoutApi() {
  return useDelete('/user/logout/v1')
}
