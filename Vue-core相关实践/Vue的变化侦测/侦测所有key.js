/**
  Observer 类会附加到每一个被侦测的 Object 上
  一旦被附加上， Observer 会将object 的所有数据转换为 getter/setter 的形式
  来收集属性的依赖， 并且当属性发生变化时会通知这些依赖
 */
  const { defineReactive } = require('./defineReactive')
  class Observer {
    constructor(value) {
      this.value = value;
      if (!Array.isArray(value)) {
        this.walk(value);
      }
    }
    walk (obj) {
      const keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        defineReactive(obj, keys[i], obj[keys[i]]);
      }
    }
  }
  module.exports = { Observer };
