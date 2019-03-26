// 装饰器  
Function.prototype.before = function (callBack) {
  let self = this;
  return function() {
    callBack()
    self()
    console.log(self)
  }
}
function ajax () {
  console.log('send params')
}
// ajax()

let fn = ajax.before( function () {
  console.log('first action')
})
// fn()

/**
 *  总结：
 *  Q：为什么要在 before 函数 return 一个匿名函数？
 *  如果不返回一个新函数，在调用 before 的时候，就直接执行了。 
 *  Q：为什么要保存 this？
 *  如果 before 函数，被保存到 全局变量， 或者对象内的 key this 的指向会被改变
 */