//  
function after (times, callback) { // 接受一个函数 返回一个函数， 满足其中一个特点 就是高阶函数
  return function () { 
    if (--times === 0) {
      callback()
    }
  }
}
let fn = after(2,function() {
  console.log('after')
})
// fn()()
fn()
fn()
/** 
 *  总结： 
 *   1. 利用闭包的特性，保留after 函数的参数。
 *   2. 多次调用 改变after 形参的 值
 */

