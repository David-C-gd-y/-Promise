let id = 0;
class Watcher {
 /**
  *  @param vm 当前组件的实例 new Vue
  *  @param exprOrFn 传入的表达式 或者 一个函数
  *  @param cd  用户传入的回调 vm.$watch('xx', cb)
  *  @param opts  用户传入的一些参数
  */
  constructor(vm, exprOrFn, cb = () => {}, opts = {}) {
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    if (typeof this.exprOrFn === 'function') {
      this.getter = exprOrFn;
    }
    this.cb = cb;
    this.opts = opts;
    this.id = id++;
    this.get();
  }

  get() {
    this.getter();
  }
};

export default Watcher;