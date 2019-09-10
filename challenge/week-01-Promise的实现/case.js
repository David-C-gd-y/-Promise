let Promise = require("./promise");

// let fs = require('fs')
// function read (url) {
//     return new Promise(function (resolve, reject) {
//         fs.readFile(url, 'utf8', function (err, data) {
//             if (err) return reject(err);
//             resolve(data)
//         })
//     })
// }
// 1) promise 中的 then 的特点， 如果 promise then 方法的成功回调 或者失败回调执行后返回的是一个 promise ， 会让这个 promise 执行 ，会调用 then 方法

// 2) 只要成功 或者 失败的回调有返回值， 都会走最外层的 then 的成功回调

// 3) 如果返回的promise 是失败的，就会走失败的回调，如果 抛出异常也会走失败 

// 4) 就近原则 先找到最近的 err 捕获， 找不到 ，向下找捕获

// let p2 = read('./name.txt').then(function (data) {
//     // return read(data + '1'); // read('./age.txt') => promise.then
//     return new Promise((resolve, reject) => {
//         // setTimeout(() => {
//         //     reject(123)
//         // }, 1000);
//         throw new Error()
//     })
// }, function (err) {
//     console.log(err)
// })

// p2.then(function (data) {
//     console.log(data)
// }, function (e) {
//     console.log('e', e)
// })

// promise 每次必须返回一个新的 promise


let p = new Promise((resolve, reject) => {
    resolve(100)
})

// 发现循环引用， 返回一个新的promise ，并且携带 reject 状态 ，赋值到 p2 

let p2 = p.then(function () {
    return p2
})

p2.then(null, function (e) {
    console.log(e)
})