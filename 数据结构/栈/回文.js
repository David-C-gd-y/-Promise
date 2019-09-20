let Stack = require('./index');
//  判断是否回文
/**
 *  什么是回文
 *  abcba
 *  ab ba
 *  或者 1001
 *  左右翻转的都是一样的 就是回文
 *  回文结构 就类似 栈的 执行结构
 *  使用栈可以轻松的判断一个字符串是否回文
 *  1. 先遍历 传入的文字
 *  2. 将每个字母推入栈内
 *  3. 声明一个新变量
 *  4. 使用while 循环出栈；
 *  5. Stack.length方法 回得到当前栈的位置，在循环体内部， 不断pop出栈，只要length 方法 返回值等于 0 则说明出栈完毕
 */
function isPalindrome (word) {
  let s = new Stack();
  for (let i = 0; i < word.length; i++) {
    s.push(word[i]);
  }
  let rigthWord = '';
  while (s.length() > 0) {
    rigthWord += s.pop();
  }
  console.log(rigthWord);

  if (rigthWord == word) {
    return true;
  } else {
    return false;
  }
}
function isPalindrome2 (word) {
  let rigthWord = word.split('').reverse()
  console.log(rigthWord);
  let newRWord = '';
  for (let i = 0; i < rigthWord.length; i++) {
    newRWord += rigthWord[i]
  }

  if (newRWord == word) {
    return true;
  } else {
    return false;
  }
}
console.log('isPalindrome :', isPalindrome('abcba'));
console.log('isPalindrome2 :', isPalindrome2('abcba'));