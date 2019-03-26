let fs = require('fs');
function after(times, callback) {
  let result = {};
  return function(key, data) {
    result[key] = data;
    if(--times === 0){
      callback(result);
    }
  }
}
/**
 * 总结：
 * 1.满足条件后 执行某个回调函数
 * 离不开 计数器 
 * 
 */
let fn = after(2, function(result) {
  console.log(result)
})
fs.readFile('./key.txt', 'utf8', function(err, data) {
  if(err) {console.log(err); return}
  fn('key',data)
} )
fs.readFile('./value.txt', 'utf8', function(err, data) {
  if(err) {console.log(err); return}
  fn('value',data)
} )