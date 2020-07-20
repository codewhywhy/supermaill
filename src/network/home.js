import { request, request1 } from "network/request";

export function getHomeMutiData() {
  return request({
    url: `/home/multidata`
  });
}
export function getHomeGoods(type, page) {
  return request1({
    params: {
      type,
      page
    }
  });
}
