import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import tsconfigPath from "vite-tsconfig-paths"
import viteBasicSslPlugin from "@vitejs/plugin-basic-ssl"
import eslintPlugin from "vite-plugin-eslint"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPath(), viteBasicSslPlugin(), eslintPlugin()],
  server: {
    https: true,
  },
})
