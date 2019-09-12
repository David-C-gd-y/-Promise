function Animal () {
  this.type = '哺乳类';
}
Animal.prototype.dirnk = function () {
  console.log('喝牛奶')
};
function Cat (name) { // 类中的 this 指向 当前的实例
  this.name = name
  Animal.call(this)
  // return { a: 1 }  
  // 如果在构造函数 直接返回引用类型 ，new 会直接得到 返回值
}
// 只继承父类实例的竖向 不继承父类原型的属性

// 1） Animal.call（this）  让父类在子类中执行  并且 this 指向 子类, 实例属性 会合并， 但是父类的原型方法不会被 合并

// let c = new Cat('mao');
// c.dirnk()  无法直接调用 



// 2) 继承公共属性  ? => 如何 共享父类原型方法 
//  Cat.prototype = Animal.prototype , 这样直接赋值 会造成属性混乱 

//   Cat.prototype.__proto__ = Animal.prototype;
Object.setPrototypeOf(Cat.prototype, Animal.prototype)
// let c = new Cat('mao');
// c.dirnk()


// 3)  Object.create() es5
// Cat.prototype = Object.create(Animal.prototype, );
// let c = new Cat();
// c.dirnk()

// function create (patentProto) {
//   function Fn () { };
//   Fn.prototype = patentProto;
//   return new Fn();
// }
// Cat.prototype = create(Animal.prototype);
// // 用 create 去指向一 父类， constructor 也会指向父类 
// let c = new Cat();
// c.dirnk()
// console.log(c.constructor)

// 这样的实现 才是没副作用的
// Cat.prototype = Object.create(Animal.prototype, { constructor: { value: Cat } });
// // 或者 用es6的 setPrototypeOf , 这样也是没有 副作用的
// Object.setPrototypeOf(Cat.prototype, Animal.prototype)
// let c = new Cat();
// c.dirnk()
// console.log(c.constructor)

// 4) 希望 子类可以继承父类 实例属性
// 在 子类内部 调用call， parent.call(this, params) ;
//  通过 call 方法 传递 参数给 父类

