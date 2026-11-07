// Renders the landing page to static HTML after `vite build`, so search robots
// (Yandex indexes JS-only pages poorly) see the content without running JS.
// The client still mounts with createRoot and replaces this markup.
import { readFileSync, writeFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { createServer } from 'vite'

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

try {
  const { default: App } = await vite.ssrLoadModule('/src/App.tsx')

  const html = renderToString(
    createElement(StaticRouter, { location: '/' }, createElement(App)),
  )
  if (html.length < 1000) throw new Error(`prerender output too small: ${html.length} chars`)

  const file = 'dist/index.html'
  const page = readFileSync(file, 'utf-8')
  const marker = '<div id="root"></div>'
  if (!page.includes(marker)) throw new Error(`${marker} not found in ${file}`)
  writeFileSync(file, page.replace(marker, `<div id="root">${html}</div>`))
  console.log(`prerendered / → ${file} (${html.length} chars)`)
} finally {
  await vite.close()
}
