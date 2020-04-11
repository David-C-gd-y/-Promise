### path

```js
let path = require('path');

path.basename('1.js', '.js'); // 获取文件名称 第二个参数 需要指定文件的 扩展名称；

path.extname('1.min.js'); // 获取 扩展名

console.log(__dirname); // 当前文件所在 目录名称
console.log(__filename); // 当前文件所在的 绝对路径

path.join(__dirname, 'a.js','/'); // 拼接成不同的路径

// 除了 / 这个参数不要随便传入，传入以后就解析成根路径了。
path.resolve(__dirname, 'a.js')  // 转化成绝对路径

path.dirname(__dirname) // 取父级路径
```