/**
 *  队列 实际使用 尝试
  前面我们提到过，经常用队列模拟排队的人。下面我们使用队列来模拟跳方块舞的人。当
  男男女女来到舞池，他们按照自己的性别排成两队。当舞池中有地方空出来时，选两个队
  列中的第一个人组成舞伴。他们身后的人各自向前移动一位，变成新的队首。当一对舞伴
  迈入舞池时，主持人会大声喊出他们的名字。当一对舞伴走出舞池，且两排队伍中有任意
  一队没人时，主持人也会把这个情况告诉大家。
  为了模拟这种情况，我们把跳方块舞的男男女女的姓名储存在一个文本文件中：
 *
 */
let fs = require('fs')
let Queue = require('./index');
let man = new Queue();
let women = new Queue();
class Dancer {
  constructor(name, sex) {
    this.name = name;
    this.sex = sex;
  }
}
function getDancers (man, women) {
  // 传入两个队列 man or women
  let names = fs.readFileSync('./test.txt', 'utf8').split('\r\n');
  for (let i = 0; i < names.length; i++) {
    names[i] = names[i].trim();
  }
  for (let i = 0; i < names.length; i++) {
    let dancer = names[i].split(' ');
    let name = dancer[1];
    let sex = dancer[0];
    if (sex == 'F') {
      women.enqueue(new Dancer(name, sex))
    } else {
      man.enqueue(new Dancer(name, sex))
    }
  }
}

function dance (man, women) {
  console.log('跳舞开始啦');
  while (!man.empty() && !women.empty()) {
    // 要有男士 还要有 女生 ，都不能没有人
    console.log('男士舞者是:', man.dequeue().name)
    console.log('女士舞者是:', women.dequeue().name)
  }
}
getDancers(man, women)
dance(man, women)

if (man.count() > 0) {
  console.log('男士还有' + man.count() + '人等待舞伴中....')
}
if (women.count() > 0) {
  console.log('女士还有' + women.count() + '人等待舞伴中....')
}
