import {request} from "@/network/request";

export function getHomeMultidaata () {
  return request({
    url: '/home/multidata'
  })
}
