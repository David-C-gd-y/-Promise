  function Person(name, age) {
    this.name = name,
    this.age = age,
    this.setName = function () {}
  }
  function A(){
    this.a = '我是一个a'
  }
  Person.prototype.setAge = function () {}
  function Student(name, age, price) {
    Person.call(this, name, age)  // 相当于: this.Person(name, age)
    /*this.name = name
    this.age = age*/
    A.call(this)
    this.price = price
  }
  var s1 = new Student('Tom', 20, 15000)
  console.log(s1)
  /**
   相比与 原型链继承，使用Call函数改变this的属性，
   虽然解决， 挂载在 子类的原型链上面的 父类实例有可能会产生的 对象引用问题；
   但是， 父类的原型方法 和 原型属性无法被继承；

   特点：
   1.解决了原型链继承 造成的子类实例共享 原型上的属于父类带来的引用类型的实例属性的内存地址引用
   2.解决了原型链继承，无法给父类传参的问题
   3.可以通过call 函数来实现多个父类的继承；

   副作用
   1. 只能继承父类的实例属性
   2. 无法实现函数复用，每个子类实例都拥有一个父类的函数副本、
   3. 实例化出来的不是父类，而是子类
   */

