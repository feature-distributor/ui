import request from "../utils/request";

export function getProjectList({ index, size }) {
  return request({
    url: "/api/rest/project/list/v1",
    method: "get",
    params: {
      index: index,
      size: size,
    },
  });
}

export function saveProject({ id, name, key }) {
  return request({
    url: "/api/rest/project/v1",
    method: "post",
    data: {
      id: id,
      name: name,
      key: key,
    },
  });
}

export function getProject({ id }) {
  return request({
    url: `/api/rest/project/v1`,
    method: "get",
    params: {
      id: id,
    },
  });
}

export function deleteProject({ id }) {
  return request({
    url: `/api/rest/project/v1`,
    method: "delete",
    params: {
      id: id,
    },
  });
}
