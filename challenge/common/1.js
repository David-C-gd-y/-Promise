/**
 *  node 为了实模块化 就在文件外面 套了一个函数
 *
 *  模块化 sea.js cmd requirejs amd(前端模块化) 废弃了
 *
 *  es6Module import export
 *
 *  模块的规范 (加了函数)
 *  1） 一个文件就是一个模块
 *  2） 每个文件都可以导出自己 module.exports
 *  3)  别人想用这个模块可以引进来， require
 *
 *  命名冲突 => 单例模式 （可以把自己的代码放在特定的对象里面去维护）不能完美解决 这个问题  ， 而且会导致 调用时代码过长
 *
 * 自执行函数  => 利用闭包   可以解决模块化的问题
 * require()  是同步执行的
 * let r = (function () {
      var a = 1;
      var b = 2;
      module.exports = 100;
      // return { a, b }
    })()

 *
 *  */


