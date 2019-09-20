/** 
 *  建立一个检查银行账户对象的构造函数   
 */

function Checking (amount) {
  // 余额
  this.balance = amount; // 属性
  this.deposit = deposit; // 方法
  this.withdraw = withdraw; // 方法
  this.toString = toString; // 方法
}
// 存款
function deposit (amount) {
  this.balance += amount;
}
// 拿走
function withdraw (amount) {
  if (amount <= this.balance) {
    this.balance -= amount;
  }
  if (amount > this.balance) {
    console.log('余额不足')
  }
}
// 显示余额
function toString () {
  return `余额：${this.balance}`
}

let account = new Checking(500);
account.deposit(1000);
console.log(account.toString()); // 余额：1500
account.withdraw(750);
console.log(account.toString()); // 余额：750
account.withdraw(800);  // 通知余额不足
console.log(account.toString()); // 余额：750
