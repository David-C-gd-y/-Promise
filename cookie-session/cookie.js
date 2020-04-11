// localStorage sessionStorage cookie session 有什么区别

// localStorage 不能跨域 5m 如果用户不请客 不会丢失

// sessionStorage session会话 会话关闭以后 会情况存储，
// 一般存储 部敏感的信息， 滚动条的位置， 页面要提供的共享数据

// cookie 用来和服务端传输数据的， 因为大小的限制，所以尽量不要把数据都存到 cookie中，
// 会导致 请求时携带更多的数据 占用带宽； 还有不能存放敏感信息

let http = require('http');

http.createServer((req,res) => {
  console.log(123)
  console.log(req.url)
  if (req.url === '/read') {
    let cookie = req.headers['cookie'];
    return res.end(cookie);
  }
  if(req.url === '/write') {
    res.setHeader('Set-Cookie', 'name=test');
    return res.end('write ok')
  }
}).listen(3000);