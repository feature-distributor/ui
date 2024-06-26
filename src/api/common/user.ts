export interface UserInfo {
  userId: string
  username: string
}

export function getUserInfoApi() {
  return useGet<UserInfo>('/user/me/v1')
}
