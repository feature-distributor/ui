export interface ProjectListResultModel {
  id: string
  name: string
  key: string
  server_key: string
  client_key: string
}

export async function getListApi() {
  return useGet<ProjectListResultModel[]>('/project/list/v1')
}
