// 核心模块

// path 模块 专门用来处理文件路径的 ；
// extname(取后缀名字)  
// basename(取文件名字) 
// join（拼接）  
// resolve （解析绝对路径）
// dirname （取父路径）

// let path = require('path');

// console.log(path.basename('1.js', '.js')) // 取文件名
// console.log(path.extname('1.min.js')) // 扩展名
// console.log(path.join('a', 'b')) // 文件名字拼接

// console.log(__dirname);// 目录名
// console.log(__filename); // 文件名
// console.log(path.join(__dirname, 'sum.js', '/'))
// console.log(path.resolve(__dirname, 'sum.js'))
// // console.log(path.dirname(__dirname))
// // console.log(path.resolve('sum.js'))
// // resolve 方法可以把一个文件路径 转化为绝对路径

// let fs = require('fs');
// let r = fs.readFileSync(path.resolve(__dirname, 'sum.js'), 'utf8');
// console.log(r)