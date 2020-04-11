## Cookie

cookie 可以服务端写 也可以客户端写

### Cookie 各个字段含义

#### Domain
  可以访问该Cookie的域名。例如，如果设置为.zhihu.com，则所有以zhihu.com，结尾的域名都可以访问该Cookie。

#### Path
  默认使用 '/' ； 以斜杠开头的 都认； 比如说： /read ，或者 /a， /b, 都认；
  也可以指定一个写入一个指定的 字符；
 比如 /write， 那么只要是 /write开头，比如 /write/a， /write/b 开头，就认， 如果是 /read 就不认。 服务是可以指定在什么 path 上写入 cookie的

 #### Expires / Max-Age
  Expires 设置的是相对时间， 设置过期日期；
  Max-age 设置的是 绝对时间， 按秒算， 如果设置为负值的话，则为浏览器进程Cookie(内存中保存)，关闭浏览器就失效；如果设置为0，则立即删除该Cookie。

  #### Size
  此Cookie的大小

  #### httpOnly
  服务端设置此属性为true，则只有在HTTP头中会带有此Cookie的信息，而不能通过document.cookie来访问此Cookie。

  #### Secure
  cookie是否仅通过安全的https,值为0或1，如果值为1，则cookie只能在https连接上有效，默认值为0，表示cookei在http和https连接上都有效。
