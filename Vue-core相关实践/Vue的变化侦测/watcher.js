
class Watcher {
  constructor(vm, propPath, callback) {
    this.vm = vm;
    this.callback = callback;
    this.getter = parsePath(propPath);
  }
  update() {
    const oldValue = this.value;
    this.value = this.get();
    this.callback.call(this.vm, this.value, oldValue);
  }
  get() {
    process.myWindow.target = this;
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



