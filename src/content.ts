import { jFetch } from "@edsolater/jfetch"
import { getWbiedQueryString } from "./utils/wbi"

async function fetchPopularVideoList() {
  const response = jFetch("https://api.bilibili.com/x/web-interface/popular")
  return response.then((data) => {
    console.log("👾 data from extension: ", data)
    return data
  })
}

async function fetchVideoInfo(params: { bvid: string }) {
  return jFetch(`https://api.bilibili.com/x/web-interface/view?bvid=${params.bvid}`, {
    originalOptions: { credentials: "include" },
  }).then((data) => {
    console.log("👾 data of video info: ", data)
    return data
  })
}

async function fetchSpaceVideoList(params: { mid: string }) {
  const queryObject = {
    mid: params.mid,
    ps: 30,
    pn: 1,
    order: "pubdate",
  }
  const queryString = await getWbiedQueryString(queryObject)
  console.log("wbiKeyObject: ", queryString)
  const res = await jFetch(`https://api.bilibili.com/x/space/wbi/arc/search?${queryString}`, {
    originalOptions: { credentials: "include" },
  })
  console.log("res: ", res)
  return res
}
/*  */
fetchSpaceVideoList({ mid: "14577351" })
