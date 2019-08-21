const path = require('path')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  outputDir: 'static',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].template = path.resolve(__dirname, './admin/index.html')
        return args
      })
  },
  configureWebpack: {
    entry: './admin/main.js',
    plugins: [
      new MonacoWebpackPlugin()
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './admin')
      }
    }
  }
}