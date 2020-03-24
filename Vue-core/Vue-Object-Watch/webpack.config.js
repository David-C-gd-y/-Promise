const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js', //index作为入口打包
  output: {
    filename: 'objectWatch.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map' ,// string false 可以产生 source-map
  resolve: {
    modules: [path.resolve(__dirname, 'source'), path.resolve(__dirname, 'node_modules')]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html')
    }),
  ]
}
