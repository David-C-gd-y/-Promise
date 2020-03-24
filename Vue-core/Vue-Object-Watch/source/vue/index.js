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
}
export default Vue;