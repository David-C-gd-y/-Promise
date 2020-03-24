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

export function observer(data) {
  if (typeof data !== 'object' || data == null) {
    return;
  }
  return new Observer(data);
}
function initData(vm) { // Object.defineProperty ，传进来的data
  let data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {};
  observer(vm._data);
}

function initComputed() {

}

function initWatch() {

}