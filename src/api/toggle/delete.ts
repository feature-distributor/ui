export function deleteToggle(toggleId: string) {
  return useDelete(`/toggle/v1?id=${toggleId}`, null, {
    loading: false,
  })
}
