import request from "../utils/request";

export function getToggleList({ projectId, index, size }) {
  return request({
    url: "/api/rest/toggle/list/v1",
    method: "get",
    params: {
      projectId: projectId,
      index: index,
      size: size,
    },
  });
}
