export interface ReqGroupOptionModel {
  attrType: string
  attrName: string
  operationType: string
  attrValue: string
}

export interface ReqGroupResultModel {
  title: string
  key: string
  description: string
  options: ReqGroupOptionModel[][]
}

export function getReqGroup(groupId: string) {
  return useGet<ReqGroupResultModel>(`/req/group/v1?groupId=${groupId}`, null, {
    loading: true,
  })
}
