function Person(name, age) {
  (this.name = name), (this.age = age), (this.setAge = function() {});
}
Person.prototype.setAge = function() {
  console.log("111");
};
function Student(name, age, price) {
  Person.call(this, name, age);
  this.price = price;
  this.setScore = function() {};
}
Student.prototype = Person.prototype;
Student.prototype.sayHello = function() {};
var s1 = new Student("Tom", 20, 15000);
console.log(s1);
/**
优点：
  不会初始化两次实例方法/属性，避免的组合继承的缺点
副作用：
  没办法辨别是实例是子类还是父类创造的，子类和父类的构造函数指向是同一个。
  简单来说 就是子类 添加在原型链上的 属性方法都会直接添加在父类的原型链上， 
  因为他们共用一个原型
 */
