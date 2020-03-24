const path = require('path');
const HtmlWebpackPlugin = reqiure('html-webpack-plugin');
console.log(path.resolve(__dirname, 'dist'));
module.exports = {
  entry: './src/index.js', //index作为入口打包
  output: {
    filename: 'output.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map' ,// string false 可以产生 source-map
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html')
    })
  ]
}