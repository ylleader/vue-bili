import request from "@/utils/request";

export function upload(data) {
  return request({
    url: "/upload",
    headers: { "Content-Type": "multipart/form-data" },
    method: "post",
    data,
  });
}
