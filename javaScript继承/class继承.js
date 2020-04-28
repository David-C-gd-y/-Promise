class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  showName() {
    console.log('我是父类')
    console.log(`我叫 ${this.name}`);
  }
}

let p1 = new Person('帅哥', 20);

console.log(p1);

class Student extends Person{
  constructor(name, age, className) {
    super(name, age);
    this.className = className;
  };
  showName() {
    console.log('我是子类方法')
  }
}
let s1 = new Student('哈哈怪', 26, '三年二班');

console.log(s1);

s1.showName()