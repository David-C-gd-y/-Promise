let path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'my.js',
    path: path.resolve(__dirname, 'dist')
  }
}