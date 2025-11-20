const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.ts', '.jsx', 'vue', '.json'],
      alias: {
        '@': path.resolve('src')
      }
    }
  }
})
