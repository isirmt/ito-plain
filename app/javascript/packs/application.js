import React from "react"
import { createRoot } from "react-dom/client"

import App from "../components/App"

const mount = () => {
  const container = document.getElementById("root")

  if (!container) return

  createRoot(container).render(React.createElement(App))
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount, { once: true })
} else {
  mount()
}
