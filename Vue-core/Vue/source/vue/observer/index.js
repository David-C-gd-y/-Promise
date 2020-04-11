import Observer from './observer'

export function initState(vm) {
  let opts = vm.$options;

  if (opts.data) {
    initData(vm)
  }

  if (opts.computed) {
    initComputed()
  }

  if (opts.watch) {
    initWatch()
  }
}

function proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key]
    },
    set(newValue) {
      vm[source][key] = newValue;
    }
  })
}

export function observer(data) {
  if (typeof data !== 'object' || data == null) {
    return; // 不是对象或者null 就不执行后续逻辑
  }
  return new Observer(data);
}
function initData(vm) { //传进来的 是当前的实例，$options 是实例传入的参数
  let data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {};
  for (const key in data) { // 代理实例化的时候 传入的 参数. data 属性
    proxy(vm, '_data', key);
  };
  // 接受一个 object
  observer(vm._data);
}

function initComputed() {

}

function initWatch() {

}