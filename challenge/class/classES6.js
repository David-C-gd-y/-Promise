class Animal {
  static a () { // 私有属性
    return 100;
  }
  constructor(age) {
    this.age = age;
    this.type = '哺乳类';
  };
  dirnk () { // 原型的属性
    console.log('喝牛奶')
  }
};

class Cat extends Animal {
  constructor(age) {
    super(age) // Animal.call(this)
  }
}
let c = new Cat(9);
console.log(c);
// console.log(c.a());  子类无法访问 私有属性
