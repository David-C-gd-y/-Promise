import { observer } from './index';
export function defineReactive(data, key, value) {
  observer(value);
  return Object.defineProperty(data, key, {
    get () {
      console.log('获取数据')
      return value;
    },
    set (newValue) {
      if (newValue === value) return;
      console.log('设置数据')
      value = newValue;
    }
  })
}


class Observer {
  constructor(data) {
    this.walk(data)
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