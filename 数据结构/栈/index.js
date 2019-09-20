class Stack {
  constructor() {
    this.dataStore = [];
    this.top = 0;
  }
  push (element) {
    // 入栈
    this.dataStore[this.top++] = element;
  }
  pop () {
    // 返回一个 栈尾元素
    return this.dataStore[--this.top];
  }
  peek () {
    // 返回一个栈顶元素
    return this.dataStore[this.top - 1];
  }
  length () {
    // 返回栈的长度
    return this.top;
  }

  clear () {
    this.top = 0;
    this.dataStore = [];
  }
}

function mulBase (num, base) {
  let s = new Stack();
  do {
    s.push(num % base);
    num = Math.floor(num /= base);
  } while (num);
  let converted = '';
  while (s.length() > 0) {
    converted += s.pop();
  }
  return converted;
}

let num = 32;
let base = 2;
let newNum = mulBase(num, base);
// console.log(newNum)
base = 8;
num = 125;
newNum = mulBase(num, base);
// console.log(newNum)

module.exports = Stack;