class Queue {
  constructor() {
    this.dataStore = [];
  }
  enqueue (item) { // 在队尾添加一个元素
    this.dataStore.push(item);
  }
  dequeue () { // 删除队首的元素
    return this.dataStore.shift();
  }
  fornt () { //读取队首的元素
    return this.dataStore[0];
  }
  back () { // 读取队尾的元素
    return this.dataStore[this.dataStore.length - 1];
  }
  toString () { // 显示队列所有元素
    let str = '';
    for (let i = 0; i < this.dataStore.length; i++) {
      str += this.dataStore[i] + '\n';
    }
    return str;
  }
  empty () { // 判断队列是否为空 
    return this.dataStore.length === 0;
  }
  count () {
    return this.dataStore.length;
  }
}

// 测试程序 

// let q = new Queue();
// q.enqueue('david');
// q.enqueue('david2');
// q.enqueue('david3');
// console.log(q.toString());
// q.dequeue();
// console.log(q.toString())
module.exports = Queue;