let http = require('http');
let querystring = require('querystring');
let server = http.createServer();
server.on('request', (req, res) => {
  console.log('请求来了')
  console.log(req.method); // 大写的请求方法
  console.log(req.url); // 请求路径
  console.log(req.httpVersion) // http 请求版本
  // 请求行
  console.log(req.headers)
  // 请求体
  let arr = [];
  req.on('data', function (chunk) {
    arr.push(chunk)
  });
  req.on('end', function () {
    // console.log(Buffer.concat(arr).toString())
    let str = Buffer.concat(arr).toString()
    let obj = {};
    if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
      obj = querystring.parse(str, '&', '=')
    }
    if (req.headers['content-type'] === 'application/json') {
      obj = JSON.parse(str)
    }
    if (req.headers['content-type'] === 'multipart/form-data') {
      // 文件上传的类型
      obj = JSON.parse(str)
      obj.type = 'form-data';
    }

    res.statusCode = 200;
    res.sendData = false;
    res.setHeader('a', 1)
    // end 方法 只能 string 或者 buffer
    res.end(`str: name:${obj.name}; age:${obj.age}; type：${obj.type}`)
  })
})
server.listen(3000, () => {
  console.log('server start') // 开启服务
})
// 端口重启
// server.on('error', function (err) {
//   console.log(err)
//   if (err.errno === 'EADDRINUSE') {
//     server.listen(++err.port, () => {
//       console.log('= =') // 开启服务
//     })
//   }
// })
// nodemon  监听node 变化