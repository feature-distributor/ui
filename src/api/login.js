import request from "../utils/request";

export function login(data) {
    return request({
        url: "/api/rest/user/login/v1",
        method: "post",
        data,
    });
}

export function getProjectList() {
    return request({
        url: "/api/rest/project/list/v1",
        method: "get",
    });
}