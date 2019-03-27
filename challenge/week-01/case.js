let Promise = require("./promise");
let p = () => {
 return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("success");
    }, 1000);
    reject('e')
  });
};

new Promise((resolve, reject) => {
  p()
  setTimeout(() => {
    reject("success");
  }, 1000);
}).then(r => {
  console.log(r)
},e => {
  console.log(e)
})
// 链式调用 卡住了。。。
