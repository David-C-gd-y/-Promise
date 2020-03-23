// 使用 proxy 来实现数据响应式变化
// 支持数组 不用做区分

function render() {
  console.log('data update',arguments);
}

let obj = { name :'大卫', age :{age: 111}, arr:[]};
let handler = {
  get(target, key) {
    if (typeof target[key] === 'object' && target[key] !== null) {
      return new Proxy(target[key], handler)
    }
    return Reflect.get(target, key)
  },
  set(target, key, value) {
    if (key === 'length' ) return true;
    render(arguments);
    return  Reflect.set(target, key, value);
  }
}
let proxy = new Proxy(obj, handler);
//  使用 proxy 以后 操作，proxy的返回值 相当于操作 源对象
// proxy.age.age = 22;
proxy.arr.push(123);
// proxy.arr.length--;
console.log(obj, proxy);
