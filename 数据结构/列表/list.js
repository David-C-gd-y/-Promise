/**
  列表属性 定义
- listSize = 列表个数
- pos = 列表当前位置
- length = 返回列表中的元素的个数
- clear = 情况列表所有的元素
- toString = 返回列表的字符串形式
- getElement = 返回当前位置的元素
- insert = 在现有元素后插入新元素
- append = 在列表后面追加元素
- remove = 从列表中删除元素
- front = 将列表的当前位置设 移动到第一个元素
- end = 将列表的当前位置移动到最后一个元素
- prev = 将当前位置后移一位
- next = 将当前位置前移一位
- currPos = 返回列表当前位置
- moveTo = 将当前位置移动到指定位置
- find = 找到当前元素的位置
- contains = 判断给定值是否在列表中
 */

function List () {
  this.dataStore = []; //用来保存列表元素
  this.listSize = 0;
  this.pos = 0;
  this.length = length;
  this.clear = clear;
  this.toString = toString;
  this.getElement = getElement;
  this.insert = insert;
  this.append = append;
  this.remove = remove;
  this.front = front;
  this.end = end;
  this.prev = prev;
  this.next = next;
  this.currPos = currPos;
  this.moveTo = moveTo;
  this.find = find;
}
// 给列表的下一个位置增加一个新的元素，这个位置刚好等于变量 listSize 的值；
function append (element) {
  this.dataStore[this.listSize++] = element;
}
// 从列表中删除元素
// 1.需要先找到元素的位置才能删除 ， 所以先实现一个find 方法
function find (element) {
  for (var i = 0; i < this.dataStore.length; i++) {
    if (this.dataStore[i] === element) {
      return i;
    }
  }
  return -1;
}

function remove (element) {
  var index = this.find(element);
  if (index > -1) {
    this.dataStore.splice(index, 1);
    --this.listSize;
    return true;
  }
  return false;
}

function length () {
  return this.listSize;
}

function toString () {
  return this.dataStore;
}
// 插入 
function insert (element, after) {
  // 往元素后方一个位置 插入
  var insertPosition = this.find(after);
  if (insertPosition > -1) {
    this.dataStore.splice(insertPosition + 1, 0, element);
    ++this.listSize;
    return true;
  }
  return false;
}
// 清空
function clear () {
  delete this.dataStore;
  this.dataStore = [];
  this.listSize = this.pos = 0;
}
// 是否包含
function contains (element) {
  for (var i = 0; i < this.dataStore.length; i++) {
    if (this.dataStorep[i] === element) {
      return true;
    }
    return false;
  }
}
// 到第一个位置
function front () {
  this.pos = 0;
}
// 到最后一个位置
function end () {
  this.pos = this.listSize - 1;
}
// 上一个位置
function prev () {
  if (this.pos > 0) {
    --this.pos;
  }
}
// 下一个位置
function next () {
  // ?? 原著似乎 故意挖坑
  if (this.pos < this.listSize) {
    ++this.pos;
  }
}

function currPos () {
  return this.pos;
}

function moveTo (position) {
  this.pos = position;
}

function getElement () {
  return this.dataStore[this.pos];
}

let names = new List();
names.append('小明');
names.append('小安');
names.append('笑笑');
names.append('微笑');
names.append('大卫');
console.log(names.toString());
// names.remove('笑笑');
console.log(names.toString())
names.front();
// console.log(names.getElement()); //小明
names.next();
// console.log(names.getElement()); //小安
names.next();
names.next();
names.prev();
console.log(names.getElement()); //笑笑


for (names.front(); names.currPos() < names.length(); names.next()) {
  console.log(names.getElement());
}
