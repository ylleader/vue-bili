import request from "@/utils/request";

export function getUserInfo() {
  return request({
    url: "/user/getInfo",
    method: "get",
  });
}

export function getUpInfo(params) {
  return request({
    url: "/user/getUpInfo",
    method: "get",
    params,
  });
}

export function updateUser(data) {
  return request({
    url: "/user/update",
    method: "post",
    data,
  });
}
