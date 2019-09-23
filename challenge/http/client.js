// node中间层 在node 中发请求 （无跨域）

let http = require('http');

let client = http.request({
  host: 'localhost',
  method: 'POST',
  path: '/aa',
  port: 3000,
  headers: {
    a: 1,
    // 'content-type': 'application/x-www-form-urlencoded'
    'content-type': 'application/json'
  }
}, (response) => {
  let arr = [];
  response.on('data', function (data) {
    arr.push(data)
  });
  response.on('end', function () {
    console.log(Buffer.concat(arr).toString());
  })

})
// client.end('type=encoded&name=test&age=10')
client.end(JSON.stringify({ name: 'test', age: 10, type: 'json' }))