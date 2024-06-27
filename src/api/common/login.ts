export function loginApi(username: string, password: string) {
  const params = {
    username,
    password,
  }
  return usePost<string, any>('/user/login/v1', params, {
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
