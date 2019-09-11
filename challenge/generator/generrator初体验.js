// generator 生成器
// dva + react   react-saga

// 生成器 是用来生成 迭代器的   
// 什么是 迭代器 
// 迭代器 就是一个有  next 方法的对象， 每次调用 next 都会返回一个对象，对象有 done 和 value
// for of  必须拥有迭代器的 对象才可以使用 ；


// let likeArray = {
//   0: 1, 1: 2, 2: 3, length: 3, [Symbol.iterator] () {
//     let index = 0;
//     let that = this;
//     return {
//       next () {
//         return {
//           done: index === that.length,
//           value: that[index++]
//         }
//       }
//     }
//   }
// };

// *  表示一个生成器 ，一般是用 来配合 yield 来使用
//   默认使用 扩展运算符号 ... 会让 迭代器执行 
// let likeArray = {
//   0: 1, 1: 2, 2: 3, length: 3, [Symbol.iterator]: function* () {
//     let index = 0;
//     let l = this.length;
//     while (index !== i) {
//       yield index++;
//     }
//   }
// };
// Symbol.iterator
// let arr = [...likeArray];
// console.log(arr);
//
// function getArr () {
//   // console.log(arguments)
// }
// getArr(1, 2, 4)

// arguments 和 自定义的类数组 ，是有区别的。 arguments是会自带 迭代器的 
// 可以在 控制台 查看  所以 要在 likeArray , 手动添加一个 迭代器 


// function* gen () {
//   yield 1;
//   yield 2;
//   return undefined;
// }
// let it = gen();
// let flag = false;
// do {
//   let { value, done } = it.next();
//   console.log(value)
//   flag = done;
// } while (!flag);



// function* read () {
//   let a = yield; // a = it.next(123)
//   console.log('你是谁？', a)
//   let b = yield;
//   console.log('他是谁？', b)
//   return 3
// };
// let it = read();
// let { value, done } = it.next();
// it.next(123);
// it.next(456);


let fs = require('mz/fs');
let co = require('co');
function* reade () {
  let content = yield fs.readFile('name.txt', 'utf8');
  let r = yield fs.readFile(content, 'utf8');
  return r;
}

co(reade()).then(function (data) {
  console.log(data)
}, function (e) {
  console.log(e)
})