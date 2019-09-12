let path = require('path');
let fs = require('fs');
let vm = require('vm');
function Module (id) {
  this.id = id;
  this.exports = {};
}
Module.wrapper = [
  '(function(exports,module,require,__dirname,__filename){',
  '\n})'
]
Module._extensions = {
  '.js' (module) {
    let content = fs.readFileSync(module.id, 'utf8');
    let scriptStr = Module.wrapper[0] + content + Module.wrapper[1];
    let fn = vm.runInThisContext(scriptStr);
    // test.js 的this ==  module.exports 
    // function(exports,module,require,__dirname,__filename)',
    fn.call(module.exports, module.exports, module)
  },
  '.json' (module) {
    let content = fs.readFileSync(module.id, 'utf8');
    content = JSON.parse(content);
    module.exports = content;
  }
}
Module.prototype.load = function () {
  // this : id , exports
  let extname = path.extname(this.id);
  Module._extensions[extname](this);
}
function req (id) {
  // 解析出绝对路径
  let absPath = path.resolve(__dirname, id);
  let module = new Module(absPath);
  // return module.load()
  module.load()
  return module.exports; //把最终的结果放在exports ，require方法会自动返回 回去
}

let sum = req(
  './test.js'
);//  require 是同步执行的  fs.readFileSync()
// console.log(sum(1, 12));
console.log(sum)


// 如何让一个字符串执行 ? eval / new Function
// eval 的执行环境是不干净的， 会查找到当前执行上下文环境
// 前端模块化 使用 eval 但是node 的模块化 不适用这个方法
// let name = 'dw';
// eval('console.log(name)'); 

// new Function
// 请 实现一个自己的 模板引擎系统 ejs handlebar (new Function)
// 但是 不能实现 node 模块
// let a = 'var a = 1; return x+y+e';
// // 最后一个参数 是字符串 前面的参数是 函数的形参
// let fn = new Function('x', 'y', 'e', a);
// console.log(fn(1, 2, 3))


// let vm = require('vm'); // 沙箱 测试环境 和 外界隔离
// let name = 'dawei'

// vm.runInThisContext('var name = "大卫"; console.log(name)');
// 打印出  大卫 ， 证明是上下文隔离的 ， 无法取到当前上下文的 变量； 是可靠的

