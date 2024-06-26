export interface SaveToggleParams {
  toggleId: string | null
  projectId: number
  key: string
  enabled: boolean
  title: string
  description: string
  valueType: string
  values: ValueParams[]
}

export interface ValueParams {
  title: string
  value: string
  description: string
  default: boolean
  disabledValue: boolean
}

export interface SaveToggleResultModel {
  toggleId: string
  title: string
  key: string
}

export function saveToggle(params: SaveToggleParams) {
  return usePost<SaveToggleResultModel, SaveToggleParams>('/toggle/v1', params, {
    loading: false,
  })
}
