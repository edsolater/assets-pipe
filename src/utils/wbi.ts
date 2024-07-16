import md5 from "md5"

// force
/** @see https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/misc/sign/wbi.md */
const mixinKeyEncTab = [
  46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49, 33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41,
  13, 37, 48, 7, 16, 24, 55, 40, 61, 26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11, 36, 20, 34,
  44, 52,
]

// Shuffle and encode the characters of imgKey and subKey
const getMixinKey = (original: string): string =>
  mixinKeyEncTab
    .map((n) => original[n])
    .join("")
    .slice(0, 32)

// Sign the request parameters with wbi
function encodeWbi(params: Record<string, any>, imgKey: string, subKey: string): string {
  const mixinKey = getMixinKey(imgKey + subKey),
    currentTime = Math.round(Date.now() / 1000),
    chrFilter = /[!'()*]/g

  Object.assign(params, { wts: currentTime }) // Add the "wts" field
  // Rearrange the parameters according to the key
  const query = Object.keys(params)
    .sort()
    .map((key) => {
      // Filter out "!'()*" characters from the value
      const value = params[key].toString().replace(chrFilter, "")
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    })
    .join("&")

  const wbiSign = md5(query + mixinKey) // Calculate the w_rid

  return query + "&w_rid=" + wbiSign
}

// Get the latest imgKey and subKey
async function getWbiKeys(): Promise<{ imgKey: string; subKey: string }> {
  const response = await fetch("https://api.bilibili.com/x/web-interface/nav", { credentials: "include" })
  const {
    data: {
      wbi_img: { img_url, sub_url },
    },
  } = await response.json()

  return {
    imgKey: img_url.slice(img_url.lastIndexOf("/") + 1, img_url.lastIndexOf(".")),
    subKey: sub_url.slice(sub_url.lastIndexOf("/") + 1, sub_url.lastIndexOf(".")),
  }
}

export async function getWbiedQueryString(rawURLparams: Record<string, any>): Promise<string> {
  const { imgKey, subKey } = await getWbiKeys()
  const query = encodeWbi(rawURLparams, imgKey, subKey)
  return query
}
