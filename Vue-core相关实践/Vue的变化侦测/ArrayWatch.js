// let obj = {
//   t:1,
//   y:2
// };


let obj = [1,2,3];

let arrayMethods = ['push', 'pop', 'shift', 'unshift', 'sort', 'reverse', 'splice'];
// 先获取原型上的方法
let arrayProto = Array.prototype;
// 创建一个无副作用的 原型，并且重写methods；
let proto = Object.create(arrayProto);
arrayMethods.forEach(methods => {
  proto[methods] = function () {
    render();
    arrayProto[methods].call(this, ...arguments);
  }
})

function observer(obj) {
  if (Array.isArray(obj)){
    obj.__proto__ = proto;
    return;
  };
  if (typeof obj === 'object') {
    for (const key in obj) {
      defineReactive(obj, key, obj[key])
    }
  }
}

function defineReactive(data, key, value) {
  Object.defineProperty(data, key, {
    get() {
      return value;
    },
    set(newValue) {
      observer(value);
      if (newValue !== value) {
        render()
        value = newValue;
      }
    }
  })
}
// defineProperty 的缺陷，新增属性 和 删除属性是不会被 watch的；

function $set(data, key, value) {
  if (Array.isArray(data)){
    return data.splice(key, 1, value);
  };
  defineReactive(data, key, value)
}

function render() {
  console.log('视图更新')
}
observer(obj);

// obj.y=23;
// $set(obj,'x', 00);
// obj.x = 1;

// obj.push(123);

$set(obj, 0 100); // 不支持数组长度变化的watch 必须通过 上面的方法来更新， 或者替换一个新的数组
console.log(obj)

