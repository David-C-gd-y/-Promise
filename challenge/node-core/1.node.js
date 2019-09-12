// node是js 的执行环境
// 执行方式  1） node xxx.js 
// 浏览器 window  = this ;
// node global = this
// console.log('hello node')
// console.log(global)
// node 为了实现模块化 在文件执行时 ， 增加了匿名函数 ， 所以this 在这个函数中被更改
// console.log(this)

// console.log(Object.keys(global))
// process 进程，当前的执行环境
// Burref 可以读写文件 内存中 Buffer
// setImmediate， setInterval， setTimeout 宏任务

// 默认把V8引擎的方法 隐藏掉
// console.dir(global, { showHidden: true })

// console.log(Object.keys(process))

// argv 运行时 传递的参数
// env 环境变量 
// cwd 当前的工作目录
// nextTick( 只能在 node里面用 )  promise.then 微任务
// stdin  stderr stdout

// console.log(process.argv.slice(2)) // 
// 可以通过 cli 来解析 node .\1.node.js --config xxx.config,js --port 3000
// ['--config', 'xxx.config,js', '--port', '3000']
// process.argv 等到一些运行时 参数，以数组形式 返回一个结果 

// argv 在node运行时可以传递特定的变量 
let o = process.argv.slice(2).reduce((memo, b, index, arr) => {
  if (b.includes('--')) { // --config --port
    // config  port    =   xxx.config,js   3000
    memo[b.slice(2)] = arr[index + 1]
  }
  return memo;
}, {})
console.log('o :', o);

//-----------------------
// env 环境变量
//  可以在当前运行的命令行中 设置一个变量  set NODE_ENV = development
// export NODE_ENV = development
// export NODE_ENV = production
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV == 'development') {
  console.log('开发环境')
} else {
  console.log('生产环境')
}

// cwd 当前的工作目录  node 的运行地点 
console.log(process.cwd()) // http-server 通过这个变量可以知道在哪里运行的node服务

// nextTick( 只能在 node里面用 )