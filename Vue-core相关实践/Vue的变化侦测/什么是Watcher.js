/**
 依赖收集在 Dep 的实例中；
 每个key 背后都有一个 Dep
 依赖的收集 是为了 通知；
 怎么通知？ 建立一个 watcher 构造函数 进行处理 通知相关的事宜
 */

/**
  什么是 watcher
  watcher 是一个中介的 角色， 数据变化的时候通知它 再由它通知别的地方
 */

// 例子 当data.a.b.c 属性发生变化的时候，则调用 第二个参数中的函数
// vm.$watch('a.b.c', function (newValue, oldValue) {
//   something...
// })

// 如何实现这么一个功能？
// 好像只要把 a.b.c 收集到Dep中就可以了
// 然后 a.b.c 发送变化的时候，通知到watcher ，接着 watcher 再执行这个 第二个参数就好了


// 所以 watcher 会有什么动作呢 ，首先接受 keyPath， callback， 还要拿到调用者；
// 还要 通知更新
// 流畅应该是 这样的 实例化以后， 先解析出keyPath，还有缓存callback，以及调用对象
// 等待Dep 调用 Watcher 实例更新函数（实际上： xxx.update()）
class Watcher {
  constructor(vm, propPath, callback) {
    this.vm = vm;
    this.callback = callback;
    // return a new function 这个function 接受一个 vm 作为参数
    this.getter = parsePath(propPath);
  }
  // update 一些什么东西呢？  更新组件？
  update() {
    const oldValue = this.value;
    this.value = this.get();
    this.callback.call(this.vm, this.value, oldValue);
  }
  get() {
    process.myWindow.target = this;
    /**
     触发addSub， 会将myWindow.target，也就是当前的实例添加到 dep.subs
     每当 目标key（a.b.c） 有变化的时候，就会调用 update 函数
    */
    let value = this.getter.call(this.vm, this.vm);
    process.myWindow.target = undefined;
    return value;
  }
}
const bailRE = /[^\w.$]/;
function parsePath(path) {
  if(bailRE.test(path)) return;
  const segments = path.split('.');
  return function(obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return;
      obj = obj[segments[i]]
    }
    return obj;
  }
}



