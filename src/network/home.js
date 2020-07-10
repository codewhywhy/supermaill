import { request } from "network/request";

export function getHomeMutiData() {
  return request({
    url: `/home/multidata`
  });
}
