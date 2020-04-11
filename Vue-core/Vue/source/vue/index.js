import { initState } from './observer';

function Vue(options) {
  this._init(options);
}

Vue.prototype._init = function (options) {
  let vm = this;
  // $options 表示 vue 中的参数
  vm.$options = options;
  // MVVM 原理  module -> view module <--> view
  initState(vm);

  // 渲染

  if (vm.options.el) {
    vm.$mount();
  }
}
function query(el) {
  if(typeof el === 'string') {
    return document.querySelector(el);
  }
  return el;
}

Vue.prototype.$mount = function() {
  let vm = this;
  let el = vm.$options.el;
  el = vm.$el = query(el); // 初始化 当前实例的根节点

}
export default Vue;