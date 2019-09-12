// setImmediate(() => {
//   console.log('setImmediate')
// })
// setTimeout(() => {
//   console.log('setTimeout1')
//   process.nextTick(() => {
//     console.log('nextTick1')
//   })
// }, 4)

// // nextTick 微任务
// process.nextTick(() => {
//   console.log('nextTick2')
//   setTimeout(() => {
//     console.log('setTimeout2')
//   }, 4)
// })
// 主栈执行时 默认超过4ms 定时器已经到了执行时间
// 启动时间比较快 小于 4ms

// 主栈执行完毕 就会清空微任务
// 和浏览器一样 ，不一样的是 每个阶段 都有自己的队列



/**
 *  执行栈      异步队列
 *  ------    [    timers                     ]
 *  |    |    [    pdending callbacks         ]---- 不关注
 *  |    |    [    idle, prepare              ]---- 不关注
 *  |    |    [    poll                       ]
 *  |    |    [    check                      ]
 *  ------    [    closr callbacks            ]---- 不关注
 *
 *  每次轮询 ，都上往下 依次执行
 *  idle, prepare 以及 pdending callbacks node 内部调用
 *
 *  timer : setTimeout；
    一个timer指定一个下限时间而不是准确时间，在达到这个下限时间后执行回调。在指定的时间过后，timers会尽早的执行回调，但是系统调度或者其他回调的执行可能会延迟它们。

    从技术上来说，poll阶段控制timers什么时候执行，而执行的具体位置在timers。

 *  poll : fs.readFile；
    poll阶段有两个主要的功能：一是执行下限时间已经达到的timers的回调，一是处理poll 队列里的事件。
    当事件循环进入poll阶段：
    poll队列不为空的时候，事件循环肯定是先遍历队列并同步执行回调，直到队列清空或执行回调数达到系统上限。
    poll队列为空的时候，这里有两种情况。

    如果代码已经被setImmediate()设定了回调，那么事件循环直接结束poll阶段进入check阶段来执行check队列里的回调。
    如果代码没有被设定setImmediate()设定回调：

    如果有被设定的timers，那么此时事件循环会检查timers，如果有一个或多个timers下限时间已经到达，那么事件循环将绕回timers阶段，并执行timers的有效回调队列。
    如果没有被设定timers，这个时候事件循环是阻塞在poll阶段等待回调被加入poll队列。

 *  check : setImmediate , 这个阶段会 检查是否有 setImmediate ，如果有就执行，没有就 回到 poll 阶段， 等待 ——> 执行 -> 再回到 timer 
    setImmediate ， 在新版本中总是比  setTimeout 要快

 * */

let fs = require('fs');

fs.readFile('./note.md', 'utf8', (err, data) => {
  console.log(222)
  setTimeout(() => {
    console.log('aaaa')
  }, 0);
  setImmediate(() => {
    console.log('setImmediate')
  })
})


