export interface UpdateReqGroupParams {
  groupId: string
  title: string
  description: string
}

export interface UpdateReqGroupResultModel {
  reqGroupId: string
}

export function updateReqGroup(params: UpdateReqGroupParams) {
  return usePut<UpdateReqGroupResultModel, UpdateReqGroupParams>('/req/group/v1', params, {
    loading: false,
  })
}
