export interface UpdateReqGroupOptionParams {
  groupId: number
  options: UpdateGroupOptionParams[]
}

export interface UpdateGroupOptionParams {
  index: number
  attrType: string
  attrName: string
  operationType: string
  attrValue: string
}

export interface UpdateReqGroupOptionResultModel {
  reqGroupId: string
}

export function updateReqGroupOption(params: UpdateReqGroupOptionParams) {
  return usePut<UpdateReqGroupOptionResultModel, UpdateReqGroupOptionParams>('/req/group/option/v1', params, {
    loading: false,
  })
}
