//  这里主要是代理 push, shift, unshift, pop, reverse, sort, splice

import { observer } from "./index";


let oldArrayProtoMethods = Array.prototype;

// 先copy 一份array 原型方法, 以防死循环
export let arrayMethods = Object.create(oldArrayProtoMethods);

let methods = ['push', 'shift', 'unshift', 'pop', 'reverse', 'sort', 'splice'];

export function observerArray(inserted) {
  for (let i = 0; i < inserted.length; i++) {
    observer(inserted[i]);
  }
}

methods.forEach(method => {
  arrayMethods[method] = function (...args) {
    // 函数劫持， 切面编程
    oldArrayProtoMethods[method].apply(this, args);
    console.log('更新 数组方法了');
    let inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
    }
    if (inserted) observerArray(inserted);
  }
})