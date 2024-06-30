export function deleteReqGroup(groupId: string) {
  return useDelete(`/req/group/v1?groupId=${groupId}`, null, {
    loading: false,
  })
}
