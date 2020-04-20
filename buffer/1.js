/** 
 * 定义 buffer 的三种方式
 */
// 1.通过长度 定义 Buffer
// 创建一个长度为 10、且用 0 填充的 Buffer。
const buf1 = Buffer.alloc(10); // alloc 第二个参数 默认为0;
// 创建一个长度为 10、且用 0x1 填充的 Buffer。
const buf2 = Buffer.alloc(10, 2); // 
// 创建一个长度为 10、且未初始化的 Buffer。
const buf3 = Buffer.allocUnsafe(10);

/**
  alloc  和 allocUnsafe 的区别;
  alloc 不包含可能存在的敏感数据， 速度会比 allocUnsafe 慢
  allocUnsafe 会可能包含敏感数据， 速度比alloc 快；

  为什么呢？
  因为 alloc 锁定的内存区间，如果存在残留的数据，会先初始化掉残留的数据，
  而 allocUnsafe 则直接返回锁定的内存区间；
  
  为什么要 区分两个这样的api呢？
  面向安全 和 面向性能
 */

 // 2. 通过数组来定义 Buffer

 // 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);
// console.log(buf4)

// 3. 字符串 创建

const buf5 = Buffer.from('字符串创建')
// console.log(buf5)


