let http = require('http');
let url = require('url')
let path = require('path')
let fs = require('fs');
let mime = require('mime');
let server = http.createServer((request, response) => {
  // 获取请求的路径
  let { pathname } = url.parse(request.url, true);
  console.log(request.url)
  console.log(pathname)
  // /client/index.html
  let currentPath = path.join(__dirname, pathname);
  fs.stat(currentPath, (err, statObj) => {
    if (err) {
      response.statusCode = 404;
      return response.end('Not Found');
    }
    if (statObj.isDirectory()) {
      console.log(currentPath)
      currentPath = path.join(currentPath, 'index.html');
      fs.access(currentPath, err => {
        if (err) {
          response.statusCode = 404;
          return response.end('Not Found');
        } else { // pipe 
          response.setHeader('content-type', mime.getType(currentPath) + ';charset=utf8')
          fs.createReadStream(currentPath).pipe(response)
        }
      })
    } else { // pipe 
      response.setHeader('content-type', mime.getType(currentPath) + ';charset=utf8')
      fs.createReadStream(currentPath).pipe(response)
    }
  })
});
server.listen(3000);

console.log('Server running at http://127.0.0.1:3000/');

// 读 ： http:// localgosh:3000/client/index.html 
// 3000 端口下的， 就去读取 client文件夹下 的index.html