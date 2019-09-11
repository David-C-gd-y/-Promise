let fs = require('mz/fs');
// let co = require('co');
function* reade () {
  let content = yield fs.readFile('name.txt', 'utf8');
  let r = yield fs.readFile(content, 'utf8');
  return r;
}
co(reade()).then(function (data) {
  console.log(data)
})
// 如果使用 co 只能根据 某些数据类型， function ， promise， generator, array, object，普通值 会抛出异常

function co (it) {
  return new Promise((resolve, reject) => {
    function next (data) {
      let { value, done } = it.next(data);
      if (!done) {
        value.then(function (data) {
          next(data)
        }, reject)
      } else {
        resolve(value)
      }
    }
    next()
  });
}

