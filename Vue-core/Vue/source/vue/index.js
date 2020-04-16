import { initState } from './observer';
import Watcher from './observer/watcher';
import { compiler } from './util'
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

  if (vm.$options.el) {
    vm.$mount();
  }
}
function query(el) {
  if(typeof el === 'string') {
    return document.querySelector(el);
  }
  return el;
};


Vue.prototype._update = function () {
  // 用 用户传入的数据去更新视图
  let vm = this;
  let el = vm.$el;
  let node = document.createDocumentFragment();
  let firstChild;
  while(firstChild = el.firstChild) { // 逐项移动到内存中 进行编译
    node.appendChild(firstChild);
  }
  compiler(node, vm);
  // todo 对文本进行替换
  el.appendChild(node);
}


Vue.prototype.$mount = function() {
  let vm = this;
  let el = vm.$options.el;
  el = vm.$el = query(el); // 初始化 当前实例的根节点
  // 1.0 渲染时 通过 watcher 来渲染
  // 2.0 组件级更新， 一个Vue实例 产生的组件
  let updateComponent = () => { // 更新组件，渲染的逻辑
    vm._update(); // 更新组件
  }
  new Watcher(vm, updateComponent) // 渲染watcher , 默认调用updateComponent
};


export default Vue;