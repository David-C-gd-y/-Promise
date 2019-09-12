## node 中间层
- 解决跨域（浏览器）  （ip，协议， 端口）

## java 多线程语言
- 虚拟机 ：tomcat， lis  

## node 适合并发高的web服务 （主要是读取文件）
- node  适合 i/o 密集型 （readFile libuv）
- 不适合cpu密集型 （数据运算 ， 加密 ， 解密）
- nginx 

- nginx 开多进程 =》 node =》 java
> 生态好 前端的构建工具 webpack gulp

## i/o 异步 阻塞/非阻塞

- 内核v8 基于 libuv库  多线程（实现异步）
- v8 引擎中的方法，setTimeout 不能操作dom bom， 只有 ecmascript， 为了支持 服务端的能力， 内置了很多 模块， fs http... 

## 异步/同步 阻塞/非阻塞 
- 指的是被调用放 fs.readFile 
- 阻塞和非阻塞指代的是调用方  
- 同步阻塞 异步非阻塞 (node 主要使用这种)

## 什么场合下应该考虑使用Node框架
当应用程序需要处理大量并发的输入输出，而在向客户端响应之前，应用程序并不需要进行非常复杂的处理。

聊天服务器
电子商务网站
