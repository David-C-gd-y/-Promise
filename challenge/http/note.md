## 状态码
- 200（成功） 204（成功，但是没有响应体） 206 （范围请求： 断点续传）
- 301 （永久重定向） 302 （临时重定向） 304 （服务器设置的缓存） 307（不改变请求方法）
- 404 （not found） 401 （没登陆，没权限） 403 （登陆了，还是没权限）
- 500  502 （服务端）

## 请求方法 restFul api
- /user GET 获取用户 （简单请求）
- /user POST 增加  增加自定义请求头，就不是简单请求了
- /user DELETE 删除 （非简单请求， 之前就会预检）
- /user PUT 修改
- /options OPTIONS 跨域 试探请求 预检

## 跨域 域名 端口 协议 
- 解决跨域 （后端解决跨域 头）

- postman 调试接口 

## url 地址 
- https://username:password@www.baidu.com:443/index.html?a=1#abc
- host www.baidu.com
- pathname /index.html
- query ? a=1

- URL: 统一资源定位符 
- URI： 统一资源标识符
- URN： 统一资源命名符
