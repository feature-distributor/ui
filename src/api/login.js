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
  const sessionUser = {
    token: res.token,
    username: data.username,
  };
  localStorage.setItem("sessionUser", JSON.stringify(sessionUser));
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
    localStorage.removeItem("sessionUser");
  }
}
