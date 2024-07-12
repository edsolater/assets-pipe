chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "sendImages") {
    console.log("Received images from content script:", message.images)
  }
})
