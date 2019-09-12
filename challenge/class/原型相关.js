/**
 *  类的继承
 *  es5构造函数来模拟类
 *  constructor
 *  prototype,
 *  __proto__
 */

function Animal (name) {// 实例属性
  this.name = name;
}
let animal1 = new Animal('1');
let animal2 = new Animal('2');
//animal1 ,animal2 都是被 Animal 产生的实例
Animal.prototype.data = { height: 20 }
// console.log(animal1.height === animal2.height)

// 每个实例 都会有__proto__

// console.log(Animal.__proto__ == Function.prototype)
// console.log(Animal.prototype.__proto__ === Object.prototype)
// console.log(Function.prototype.__proto__ == Object.prototype)

// console.log(Function.prototype.__proto__)
// console.log(Object.prototype.__proto__)
/**
true
true
true
{}
null
*/

console.log(animal1.constructor.name)
console.log(animal1.constructor === Animal)
// Animal
// true


// 类的原型 指向 和实例的 __proto__ 是相等
console.log(Animal.prototype == animal1.__proto__) // true