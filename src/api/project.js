import request from "../utils/request";

export function getProjectList() {
  return request({
    url: "/api/rest/project/list/v1",
    method: "get",
  });
}
