export interface GroupPageParams {
  index: number
  size: number
}

export interface GroupPageModel {
  total: number
  list: GroupListResultModel[]
}

export interface GroupListResultModel {
  groupId: string
  title: string
  key: string
  description: string
}

export async function getListApi(params: GroupPageParams) {
  return useGet<GroupPageModel, GroupPageParams>(`/req/group/list/v1?index=${params.index}&size=${params.size}`)
}
