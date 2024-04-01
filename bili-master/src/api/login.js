import request from "@/utils/request";

export function passwordLogin(data) {
  return request({
    url: "/user/pwdLogin",
    method: "post",
    data,
  });
}

export function SMSCodeLogin(data) {
  return request({
    url: "/user/SMSCodeLogin",
    method: "post",
    data,
  });
}
