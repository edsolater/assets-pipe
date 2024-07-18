import { jFetch, createJFetchMiddleware } from "@edsolater/jfetch"
import type { TidNumber } from "./verboseItem"
import { getWbiedQueryString } from "./wbi"

export async function fetchPopularVideoList() {
  const response = jFetch("https://api.bilibili.com/x/web-interface/popular")
  return response
}

/**
 * @see https://github.com/SocialSisterYi/bilibili-API-collect/blob/8cdf355f7e963168f6237f4fd9a405f13ce036b6/docs/video/info.md#%E8%8E%B7%E5%8F%96%E8%A7%86%E9%A2%91%E8%AF%A6%E7%BB%86%E4%BF%A1%E6%81%AFweb%E7%AB%AF
 * it's detailed vedio info (have like\favorite)
 */
export async function fetchDetailedVideoInfo(params: { bvid: string }) {
  return jFetch(`https://api.bilibili.com/x/web-interface/view?bvid=${params.bvid}`, {
    originalOptions: { credentials: "include" },
  })
}

/**
 * @see https://github.com/SocialSisterYi/bilibili-API-collect/blob/8cdf355f7e963168f6237f4fd9a405f13ce036b6/docs/user/space.md#%E6%9F%A5%E8%AF%A2%E7%94%A8%E6%88%B7%E6%8A%95%E7%A8%BF%E8%A7%86%E9%A2%91%E6%98%8E%E7%BB%86
 * it's brief vedio info
 */
export async function fetchUserVideoList(queryObject: {
  /** 目标用户mid */
  mid: string
  /** 排序方式 */
  orider?: "pubdate" /* default 最新发布 */ | "click" /* 最多播放 */ | "stow" /* 最多收藏 */
  /** 筛选目标分区 */
  tid?: TidNumber
  /** 页码 */
  pn?: number
  /** 每页数量 */
  ps?: number
}) {
  const queryString = await getWbiedQueryString(queryObject)
  console.log("wbiKeyObject: ", queryString)
  const videoList = await jFetch(`https://api.bilibili.com/x/space/wbi/arc/search?${queryString}`, {
    originalOptions: { credentials: "include" },
    middlewares: [bilibiliParseMidVideoListMiddleware],
  })
  console.log("videoList: ", videoList)
  return videoList
}

const bilibiliParseMidVideoListMiddleware = createJFetchMiddleware(async (ctx, next) => {
  const jsonResponse = await next()
  const vedioList = jsonResponse?.data?.list?.vlist
  return vedioList
})
