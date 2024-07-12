/** @jsxImportSource solid-js */
import { render } from "solid-js/web"
import { css } from "goober"
import { createSignal } from "solid-js"

const App = () => {
  const [title, setTitle] = createSignal(document.title)
  const [images, setImages] = createSignal<{ src: string; width: number; height: number }[]>([])

  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "sendImages") {
      setImages(message.images)
    }
  })

  const cardStyle = css`
    background-color: white;
    padding: 10px;
    border: 1px solid #ccc;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 300px;
    width: 200px;
    height: 300px;
  `

  const imageStyle = css`
    max-width: 100%;
    margin-bottom: 10px;
  `

  return (
    <div class={cardStyle}>
      <h1>{title()}</h1>
      <div>
        {images().map((img) => (
          <img src={img.src} class={imageStyle} />
        ))}
      </div>
    </div>
  )
}

const appElement = document.getElementById("app")
if (appElement) {
  render(() => <App />, appElement)
}
