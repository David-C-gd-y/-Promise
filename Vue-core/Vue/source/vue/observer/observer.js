import { observer } from './index';
import { arrayMethods, observerArray } from './array';
export function defineReactive(data, key, value) {
  observer(value);
  return Object.defineProperty(data, key, {
    get () {
      console.log('获取数据')
      return value;
    },
    set (newValue) {
      if (newValue === value) return;
      observer(newValue);
      console.log('设置数据')
      value = newValue;
    }
  })
}


class Observer {
  constructor(data) { // data 就是刚刚定义的 vm._data
    // 将用户的数据 使用 Object.defineProperty 代理
    if (Array.isArray(data)) {
      // 如果是数组， 那就代理掉 当前数据的 某些能改变数组长度的方法
      data.__proto__ = arrayMethods; // 如果是数组 就让它查找我们 aop 编写过的原型链方法
      // 还要观测 数组的每一项
      observerArray(data)
    } else {
      this.walk(data);
    }
  }

  walk(data) {
    let keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i]
      defineReactive(data, key, data[key]);
    }
  }
};


export default Observer;