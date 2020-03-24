/**
  由于 proxy 支持度 还不够高， Vue 2.x 都是使用 Object.defineProperty() 来实现侦测对象的变化
  本次 实践一律 按照 2.x 的原理进行操作；
 */

// 封装一个 监测变化的函数；
function defineReactive(data, key, value) {
  /**
    参数
    @param {data: Object} 要在其上定义属性的对象
    @param {key: string} 要定义或修改的属性的名称
    @param {descriptor: Object} 将被定义或修改的属性描述符
   */
  return Object.defineProperty(data, key, {
    enumerable: true, // 可被遍历
    configurable: true, // 可以被编辑的属性，修改 或者 删除
    get: function() {
      return value;
    },
    set: function(newValue) {
      if (value === newValue) return;
      value = newValue;
    }
  });
}
// 利用了闭包， 把value 缓存起来了；
// 每次get都会读取 defineReactive 内部变量；
// 封装好以后， 每当从data的 key 中读取数据时，get函数会触发；
// 每当往data的 key 赋值的时候，都会调用set函数；
