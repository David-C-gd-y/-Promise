/**
 eval 的执行环境不够感觉， 字符串执行的时候 是可以访问外部变量的
 前端的模块化 使用 eval 但是node的模块化不适用这种方式
 */

// let name = 'test';
// eval('console.log(name)');


// new Function() 
// 请实现一个 模板引擎

// let a = 'var a = 1; return x+y+z'
// // 最后一个参数是 是字符串， 前面的都是函数形参
// let fn = new Function('x,y,z',a)
// console.log(fn(1,2,3))

// 沙箱， 测试环境 和外界隔离
let vm = require('vm');
let name = 'abc';
vm.runInThisContext('console.log(name)')