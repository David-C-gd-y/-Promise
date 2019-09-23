let http = require('http');
let url = require('url')
let path = require('path')
let fs = require('mz/fs');
let mime = require('mime');
class Server {

  async handleRequest (req, res) { //这里的this 是server的实例
    // this?
    try {
      let { pathname } = url.parse(req.url, true);
      let currentPath = path.join(__dirname, pathname);
      let statObj = await fs.stat(currentPath);
      if (statObj.isDirectory()) {
        currentPath = path.join(currentPath, 'index.html');
        await fs.access(currentPath); // 如果路径不存在直接报错
        this.sendFile(req, res, currentPath);
      } else {
        this.sendFile(req, res, currentPath);
      }
    } catch (error) {
      this.emitError(error, res, req);
    }

  }
  sendFile (req, res, currentPath) {
    res.setHeader('Content-Type', mime.getType(currentPath) + ';charset=utf8');
    fs.createReadStream(currentPath).pipe(res)
  }
  emitError (err, res, req) {
    console.log(err);
    res.statusCode = 404;
    res.end('not found');
  }
  start () {
    let server = http.createServer(this.handleRequest.bind(this))
    server.listen(...arguments);
  }
}

let server = new Server();
server.start(3000, () => {
  console.log(`server statrt : 3000`)
})
