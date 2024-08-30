import path from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import biomePlugin from 'vite-plugin-biome'

const basenameProd = '/react-web-starter'

export default defineConfig(({ command }) => {
  const isProd = command === 'build'

  return {
    base: isProd ? basenameProd : '',
    plugins: [react(), biomePlugin()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      global: {
        basename: isProd ? basenameProd : '',
      },
    },
  }
})