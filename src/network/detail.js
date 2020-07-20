import { request } from "./request";
export function getDetail(iid) {
  return request({
    url: "/home/multidata",
    params: {
      iid
    }
  });
}

//把服务器返回的对象先封装到一个类里边
export class goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.realPrice = itemInfo.lowNowPrice;
  }
}
