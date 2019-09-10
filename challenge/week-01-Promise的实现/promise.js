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
//  A+ 规范测试 https://github.com/promises-aplus/promises-tests
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class Promise {
  constructor(Exexcutor) {
    if (typeof Exexcutor !== 'function') {
      new TypeError('Promise Exexcutor is not a function')
      return;
    }
    this.status = PENDING;
    this.value = undefined; //解决函数 传值
    this.reason = undefined; // 拒绝函数对 传值
    this.onResolveCallBack = [];// 遇到异步的时候，需要维护的队列
    this.onRejectCallBack = [];

    const resolve = value => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        // 发布
      }
      this.onResolveCallBack.forEach(f => f());
    }
    const reject = reason => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        // 发布
      }
      this.onRejectCallBack.forEach(f => f());
    }
    try {
      Exexcutor(resolve, reject);
    } catch (error) {
      console.debug(error)
      reject(error)
    }
  }

  then (onfulfilled, onrejected) {
    onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : v => v;
    onrejected = typeof onrejected === 'function' ? onrejected : e => {
      throw e
    }
    // 需要返回一个新的 Promose 才能 纯净的链式调用；
    /** 
     *  onFulfilled 和 onRejected 都是可选参数。
     *  如果 onFulfilled 不是函数，其必须被忽略
     *  如果 onRejected 不是函数，其必须被忽略
    */
    // 增加多一个判断   判断x 是不是一个promise ，如果是promise 那就采用 当前的promise 的状态
    const resolvePromise = (promise2, x, resolve, reject) => {
      if (promise2 === x) {
        return reject(new TypeError('循环引用'));
      }
      let called;
      if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        // 有可能是一个 promise 
        try {
          let then = x.then;
          if (typeof then === 'function') {
            then.call(x, y => {
              if (called) return;
              called = true;
              resolvePromise(promise2, y, resolve, reject)
            }, r => {
              if (called) return;
              called = true;
              reject(r)
            })
          } else {
            if (called) return;
            called = true;
            resolve(x)
          }
        } catch (e) {
          if (called) return;
          called = true;
          reject(e)
        }
      } else {
        if (called) return;
        called = true;
        resolve(x)
      }
    }
    let promise2;
    promise2 = new Promise((resolve, reject) => {


      // 使用 status 来屏蔽其他函数对执行
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onfulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        }, 0);
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onrejected(this.reason)
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        }, 0);
      }

      if (this.status === PENDING) { // 说明有异步逻辑
        // 订阅
        this.onResolveCallBack.push(() => {
          setTimeout(() => {
            try {
              let x = onfulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error)
            }
          }, 0);
        });
        this.onRejectCallBack.push(() => {
          setTimeout(() => {
            try {
              let x = onrejected(this.reason)
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error)
            }
          }, 0);
        });
      }

    })
    return promise2;
  }

}
Promise.deferred = Promise.defer = () => {
  let d = {};
  d.promise = new Promise((resolve, reject) => {
    d.resolve = resolve;
    d.reject = reject;
  });
  return d;
}
console.log(Date, Promise)
module.exports = Promise;