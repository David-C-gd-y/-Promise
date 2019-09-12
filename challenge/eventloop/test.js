setTimeout(() => {
  console.log(1)
  Promise.resolve().then(data => {
    console.log(2)
  })
}, 0);
Promise.resolve().then(r => {
  console.log(3)
  setTimeout(() => {
    console.log(4)
  }, 0);
})
console.log('start');

// output : start 3 1 2 4
// 执行属性  微任务 
// 给方法 分类 宏任务 setTimeout > 微任务 then 

// 总结：  先执行同步 代码， 再执行微任务 ，最后执行 宏任务 
// 浏览器 底层处理异步任务，是使用队列来维护 任务顺序；

//  log: start -> promise(微任务) log:3 
//      -> setTimeout(宏任务) log: 1 -> promise(微任务) log: 2 -> setTimeout(宏任务) log :4 
// 特点： 同步优先执行；  异步任务，每次进入下一轮宏任务之前， 都会清空掉 微任务， 也就是说， 宏任务 永远在 下一个tick 执行，微任务 永远在当前轮（轮询）结束之前执行 

// 处理同步代码 使用栈来 执行
function a (params) {
  console.log('a')
  function b (params) {
    console.log('b')
    function c (params) {
      console.log('c')
    }
    c()
  }
  b()
}
a()
// output a b c；

/**
 *  Vue.nextTick
 *
 *  微任务：
 *    then  MutationObserver Object.observe(已废弃)
 *  宏任务：
 *    (setImmediate ie 支持) setTimeout MessageChannel
 */
