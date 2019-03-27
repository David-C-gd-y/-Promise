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

class Promise {
  constructor(Exexcutor) {
    if(typeof Exexcutor !== 'function') {
     new TypeError ('Promise Exexcutor is not a function')
     return;
    }
    this.status = 'pending';
    this.value = undefined; //解决函数 传值
    this.reason = undefined; // 拒绝函数对 传值
    const resolve = (value) => {
      if(this.status === 'pending') {
        this.status = 'fulfilled';
        this.value = value;
      }
    }
    const reject = (reason) => {
      if(this.status === 'pending') {
        this.status = 'rejected';
        this.reason = reason;
      }
    }
    try {
      Exexcutor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then(onfulfilled, onrejected){
    // 使用 status 来屏蔽其他函数对执行
    if (this.status === 'fulfilled') {
      onfulfilled(this.value); //then 传入对函数
    }
    if (this.status === 'rejected') {
      onrejected(this.reason)
    }
  }
}

module.exports = Promise;