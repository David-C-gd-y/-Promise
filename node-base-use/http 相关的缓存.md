## 缓存 304
### 强制缓存

Cache-Control  max-age

低版本的: Expires


### 协商缓存

last-modified(服务端) if-modified-since（客户端）
Etag if-none-match


### node 如何设置跨域？

```js
http.createServer(function(req, res) {
  let {pathname} = url.parse(req.url);
  let absPath = path.join(__dirname, pathname);

  res.setHeader('Access-Control-Allow-Origin', '*');// 允许任何源访问

  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT,OPTIONS');// 允许 复杂请求访问
  // 复杂请问是 如果部 声明允许 会造成跨域
  res.setHeader('Access-Control-Allow-Credentials', true);// 允许 携带cookie
  res.setHeader('Access-Control-Allow-Header', 'Content-Type,Authorization'); // 允许接待的 请求头

  res.setHeader('Access-Control-Max-Age', 10); // 秒位单位 绝对时间
  // 因为 options 请求，会重复发送， 可以利用缓存来 限制这种试探请求 提高访问性能

  if(req.method === 'OPTIONS') return res.end();
})


```