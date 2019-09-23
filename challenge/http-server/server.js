let http = require('http')
let url = require('url')
let path = require('path')

let chalk = require('chalk')  // 粉笔插件  各种颜色的文字
let mime = require('mime') // 解析类型的
let fs = require('mz/fs') // promise
let ejs = require('ejs') // 用数据和模板组成一个页面
let template;
template = fs.readFileSync(path.resolve(__dirname, 'template.html'), 'utf8')

class Server {
  constructor(config) {
    this.host = config.host;
    this.dir = config.dir;
    this.port = config.port;
    this.template = template;
  }
  async handleRequest (req, res) {
    // 1） 判断是文件 还是文件夹   如果是文件 直接将内容展示给用户 
    try {
      let { pathname } = url.parse(req.url);
      let absPath = path.join(this.dir, pathname);
      await fs.access(absPath); // 如果路径不存在直接报错
      let statObj = await fs.stat(absPath);
      // 如果是目录就列出目录列表
      if (statObj.isDirectory()) {
        // 先读取当前目录下的 所有列表
        let dirs = await fs.readdir(absPath)
        let str = ejs.render(this.template, { arr: dirs })
        res.setHeader('Conten-Type', 'text/html;charset=utf8');
        res.end(str)
      } else {
        this.sendFile(req, res, statObj, absPath);
      }
    } catch (error) {
      console.log(error);
      this.sendError(req, res, statObj, absPath)
    }
  }
  sendError (req, res, statObj, absPath) {
    res.statusCode = 404;
    res.end('Not Found');
  }
  sendFile (req, res, statObj, absPath) {
    res.setHeader('Content-Type', mime.getType(absPath) + ';charset=utf8');
    fs.createReadStream(absPath).pipe(res)
  }
  start () {
    let server = http.createServer(this.handleRequest.bind(this))
    server.listen(this.port, this.host, () => {
      console.log(chalk.yellow(`启动 my-http-server 服务 \r\n`))
      console.log(chalk.yellow(`启动路径 ${this.dir}\r\n`))
      console.log(chalk.green(`  http://${this.host}:${this.port}`))
    })
  }
}
module.exports = Server;