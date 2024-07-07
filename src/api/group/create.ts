export interface CreateReqGroupParams {
  title: string
  key: string
  description: string
  options: CreateGroupOptionParams[]
}

export interface CreateGroupOptionParams {
  index: number
  attrType: string
  attrName: string
  operationType: string
  attrValue: string
}

export interface CreateReqGroupResultModel {
  reqGroupId: string
}

export function createReqGroup(params: CreateReqGroupParams) {
  return usePost<CreateReqGroupResultModel, CreateReqGroupParams>('/req/group/v1', params, {
    loading: false,
  })
}
