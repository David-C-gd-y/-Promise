/**
  无副作用的继承 是因为在 create函数作用域内 创建了一个新对象；
  利用闭包的方式把 对象返回，然后覆盖到子类上
 */

Object.create = function create(object) {
  function F() {};
  F.prototype = object;
  return new F()
}