export function deleteProject(projectId: string) {
  return useDelete(`/project/v1?id=${projectId}`, null, {
    loading: false,
  })
}
