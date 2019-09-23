#!/usr/bin/env node

/**
 *   默认启动一个 http 服务
 *   port ip地址
 */

let config = {
  port: 3000,
  host: '127.0.0.1',
  dir: process.cwd() // 在哪里启动 路径就是哪里
}

// process.argv.slice(2)

// yargs commander https://www.npmjs.com/package/commander
let commander = require('commander');

let json = require('../package.json');

commander.version(json.version)
  .option('-p, --port <n>', 'set http-server port')
  .option('-o, --host <n>', 'set http-server host')
  .option('-d, --dir <n>', 'set http-server directory')
  .on('--help', function () {
    console.log('Examples')
    console.log('   $ my-http-server --port -- host')
  })
  .parse(process.argv);
// console.log(commander.port)
// console.log(commander.host)
// console.log(commander.dir)

config = { ...config, ...commander }
// 解析用户传入的数据  根据数据启动一个 http-server
// console.log(config)

let Server = require('../server.js');
let server = new Server(config);
server.start()  // 根据 配置启动服务