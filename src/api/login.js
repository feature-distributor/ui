import request from "../utils/request";

export function me() {
  return request({
    url: "/api/rest/user/me/v1",
    method: "get",
  });
}

export async function login(data) {
  const res = await request({
        url: "/api/rest/user/login/v1",
        method: "post",
        data,
    });
    localStorage.setItem("token", res.token);
}

export async function logout() {
    try {
        try {
            return await request({
                url: "/api/rest/user/logout/v1",
                method: "post",
            });
        } catch (e) {
            console.log(e);
        }
    } finally {
        localStorage.removeItem("token");
    }
}

export function getProjectList() {
  return request({
    url: "/api/rest/project/list/v1",
    method: "get",
  });
}
