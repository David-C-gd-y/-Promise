class Promise {
  constructor(fn) {
    this.success = [];

    let resolve = data => {
      this.success.forEach(item => item(data))
    }
    fn(resolve)
  }
  then (success) {
    this.success.push(success)
  }
}
let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok')
  }, 1000);
})
p.then(data => console.log(data))

/**
 *  then 的时候使用了 添加了观察者
 *  当 调用 resolve 的时候， 被观察者 就开始调用 观察者
 *  */