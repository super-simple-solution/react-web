import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import eslintPlugin from 'vite-plugin-eslint'

const basenameProd = '/react-web-starter'

export default defineConfig(({ command }) => {
  const isProd = command === 'build'

  return {
    base: isProd ? basenameProd : '',
    plugins: [react(), eslintPlugin()],
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