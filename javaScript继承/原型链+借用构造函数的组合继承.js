// 组合继承
// 结合 原型链 和 构造函数两者的优点

function Person(name, age) {
  this.name = name ;
  this.age = age;
};
function Person1(name, age) {
  this.name1 = name ;
  this.age1 = age;
};

Person.prototype.setAge = function setAge(newAge) {
  this.age = 'age';
  console.log(this.age)
};
Person1.prototype.setAge1 = function setAge1(newAge) {
  this.age1 = 'age1';
  console.log(this.age)
};

// 1.先显式声明 一个子类；
function Student(name, age, className, job = '普通学生') {
  Person.call(name, age);
  Person1.call(name, age);
  this.className = className;
  this.job = job;
  this.setJob = function (job) {
    this.job = job;
  };
};
// 2. 父类 实例化一个对象， 覆盖掉子类构造函数的 原型；
Student.prototype = Object.assign({},new Person(),new Person1()) ;
// 3. 子类的构造函数 重新指向 自身Student
Student.prototype.constructor = Student;

console.log(new Student(1,2,3,4))
// 重新指向 自身以后 就能够正常的使用了

/**
  优点：
    实现多继承；
    不存在引用属性共享的问题；
    可以向父类传参；
    函数可复用；

  副作用：
    需要多次实例化 父类
 */


