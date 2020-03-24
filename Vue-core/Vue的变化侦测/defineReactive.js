const { Dep } = require("./dep");
class Observer {
  constructor(value) {
    this.value = value;
    if (!Array.isArray(value)) {
      this.walk(value);
    }
  }
  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]]);
    }
  }
}
function defineReactive(data, key, value) {
  // 如果传入的 value 是对象那么就递归调用 observer
  if (typeof value === 'Object') {
    new Observer(value);
  }
  let dep = new Dep(); // 依赖存储
  return Object.defineProperty(data, key, {
    enumerable: true, // 可被遍历
    configurable: true, // 可以被编辑的属性，修改 或者 删除
    get: function() {
      dep.depend();
      return value;
    },
    set: function(newValue) {
      if (value === newValue) return;
      value = newValue;
      dep.notify();
    }
  });
}

module.exports = {
  defineReactive
};
