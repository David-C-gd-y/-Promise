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

