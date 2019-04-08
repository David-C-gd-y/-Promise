// 实现 es6 的promise  
// Promise 是一个类 承诺 允诺  (异步解决方案)
// pending 等待状态 ->  fulfilled 成功态 (玩具少)
// pending 等待状态 ->  rejected 失败态 (玩具多)
// 成功态和失败态 不能相互转化 
// exexcutor函数 而且会立即执行，参数是resolve函数 reject
// 每个promise实例都有一个then方法
// onfulfilled,onrejected\
// 术语
// “promise”是具有then方法的对象或函数，其行为符合此规范。
// “thenable”是一个定义then方法的对象或函数。
// “value”是任何合法的JavaScript值(包括未定义的、thenable或promise)。
// “exception”是一个使用throw语句抛出的值。
// “reason”是一个值，它指示了一个承诺为什么被拒绝。
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class Promise {
  constructor(Exexcutor) {
    if(typeof Exexcutor !== 'function') {
     new TypeError ('Promise Exexcutor is not a function')
     return;
    }
    this.status = PENDING;
    this.value = undefined; //解决函数 传值
    this.reason = undefined; // 拒绝函数对 传值

    // 遇到异步的时候，需要维护的队列
    this.onResolveCallBack = [];
    this.onRejectCallBack = [];

    const resolve = (value) => {
      if(this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        // 发布
        this.onResolveCallBack.forEach(f=> f());
      }
    }
    const reject = (reason) => {
      if(this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        // 发布
        this.onRejectCallBack.forEach(f=> f());
      }
    }
    try {
      Exexcutor(resolve, reject);
    } catch (error) {
      console.debug(error)
      reject(error)
    }
  }

  then(onfulfilled, onrejected){
    // 需要返回一个新的 Promose 才能 纯净的链式调用；
    /** 
     *  onFulfilled 和 onRejected 都是可选参数。
     *  如果 onFulfilled 不是函数，其必须被忽略
     *  如果 onRejected 不是函数，其必须被忽略
    */
    // 参数的可选
    onfulfilled = typeof onfulfilled ==='function' ? onfulfilled : value => value;
    onrejected = typeof onrejected == 'function' ?onrejected : error => {throw error}
    return  new Promise(() => {
      // 使用 status 来屏蔽其他函数对执行
        if (this.status === FULFILLED) {
          onfulfilled(this.value);   
        }
        if (this.status === REJECTED) {
          onrejected(this.reason)
        }  

      /**
       * 但是 then 是同步的，所以会存在 status 还是 pending 的时候,要维护两个队列.
       * 
       * 因为 暴露出去的两个 函数<resolve> or <reject>，是提供给使用者的； 
       * 所以，两个函数触发时机，是由使用者决定，
       * 
       * <onfulfilled> or <onrejected>  就是then 里面传的匿名函数
       * 先分别订阅 <onfulfilled> or <onrejected> 这两个函数，保存在 两个队列中，
       * 
       */ 
        if (this.status === PENDING) {
          this.onResolveCallBack.push(() => {
            onfulfilled(this.value)
          });
          this.onRejectCallBack.push(() => {
            onrejected(this.reason)
          });
        }

    })

  }
}

module.exports = Promise;