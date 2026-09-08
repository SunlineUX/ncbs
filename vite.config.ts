import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const stylesDir = resolve(__dirname, 'src/styles')
const toPosix = (p: string) => p.replace(/\\/g, '/')

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        // 注入全局 Less 变量与混入，所有 .less / <style lang="less"> 可直接使用
        // 使用项目绝对路径以避免 less 编译器无法解析 @ 别名
        additionalData: `@import "${toPosix(resolve(stylesDir, 'variables.less'))}"; @import "${toPosix(resolve(stylesDir, 'mixins.less'))}";`,
        javascriptEnabled: true,
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 9527,
    open: false,
  },
  build: {
    target: 'es2020',
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
  },
})
