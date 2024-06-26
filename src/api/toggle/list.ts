export interface TogglePageParams {
  projectId: string
  index: number
  size: number
}

export interface TogglePageModel {
  total: number
  list: ToggleListResultModel[]
}

export interface ToggleListResultModel {
  id: string
  title: string
  key: string
  enabled: boolean
  valueType: string
  description: string
}

export async function getListApi(params: TogglePageParams) {
  return useGet<TogglePageModel, TogglePageParams>(`/toggle/list/v1?projectId=${params.projectId}&index=${params.index}&size=${params.size}`)
}
