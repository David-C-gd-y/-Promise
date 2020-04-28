/**
 *  Buffer 常用方法
 */
let buf = Buffer.allocUnsafe(6);

//  fill方法 ;  buffer.fill(value ,[offset [,end]], [encoding])
// console.log(buf.fill(0));


// ---------
// write方法；类似push 方式， 因为buffer 是类似数组的结构。 但是可以指定某个区间来填充，不是单纯的追加

//  write方法；  buf.write(string[, offset[, length]][, encoding])
// buf.write('珠',0,3,'utf8');
// buf.write('峰',3,3,'utf8'); //珠峰
// console.log(buf)


// writeInt8
// let buf = Buffer.alloc(4);
// buf.writeInt8()
// buf.writeInt8(0,0);
// buf.writeInt8(16,1);
// buf.writeInt8(32,2);
// buf.writeInt8(48,3);
// console.log(buf);// <Buffer 00 10 20 30>
// console.log(buf.readInt8(0));//0
// console.log(buf.readInt8(1));//16
// console.log(buf.readInt8(2));//32
// console.log(buf.readInt8(3));//48

/**
 * Little-Endian & Big-Endian
 *
 * 不同的cpu有不同的字节序类型， 这些字节序是指整数在内存中保存的顺序
 * @ Big-Endian: 将高序字节存储在起始位置 （高位编址）
 * @ Little-endian：将低序字节存储在起始地址（低位编址）
 * 计算机电路先处理低位字节，效率比较高，因为计算都是从低位开始的
 */

//  let buffer = Buffer.alloc(4);
//  buffer.writeInt16BE(2**8,0);
//  console.log(buffer) // <Buffer 01 00 00 00>
//  console.log(buffer.readInt16BE(0))// 256

//  buffer.writeInt16LE(2**8, 2)
//  console.log(buffer) // <Buffer 01 00 00 00>
//  console.log(buffer.readInt16LE(2))// 256

 // toString() 方法
//  let buffer = Buffer.from('我是一个buffer');
// buf.toString([encoding[, start[, end]]])
//  console.log(buffer.toString('utf8', 0,4)) // 中文 是3位
// let subBuffer = buffer.slice();// 和数组那个 一样
// console.log(subBuffer.toString())
// let {StringDecoder}  = require('string_decoder');
// let sd = new StringDecoder();
// console.log(sd.write(buffer.slice(0,4)));
// console.log(sd.write(buffer.slice(4)));
// console.log(sd)


// copy 
// let subBuffer = Buffer.alloc(6);

// buffer.copy(subBuffer, 0, 0,3)
// buffer.copy(subBuffer, 3, 3,6)
// console.log(subBuffer.toString())

// concat
let buffer1 = Buffer.from('大卫');
let buffer2 = Buffer.from('很帅');
let buffer = Buffer.concat([buffer1,buffer2]);
console.log(buffer.toString());