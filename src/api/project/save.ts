export interface SaveProjectParams {
  id: string | null
  name: string
  key: string
}

export interface SaveProjectResultModel {
  id: string
  name: string
  key: string
}

export function saveProject(params: SaveProjectParams) {
  return usePost<SaveProjectResultModel, SaveProjectParams>('/project/v1', params, {
    loading: false,
  })
}
