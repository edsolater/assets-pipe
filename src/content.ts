import { fetchUserVideoList, fetchDetailedVideoInfo } from "./utils/fetchers"
import { ups } from "./utils/upList"

fetchUserVideoList({ mid: ups[0].mid }).then((data) => {
  console.log("👾 data of user video list: ", data)
})

fetchDetailedVideoInfo({ bvid: "BV11i421y7KQ" }).then((data) => {
  console.log("👾 data of video info: ", data)
})
