function getImages() {
  const images = Array.from(document.images)
    .filter((img) => img.naturalWidth > 100 && img.naturalHeight > 100)
    .map((img) => ({ src: img.src, width: img.naturalWidth, height: img.naturalHeight }))
  return images
}

chrome.runtime.sendMessage({ action: "sendImages", images: getImages() })
