let express = require('express');
let app = express();

// get 请求
app.get('/',function(request,response){
  console.log(request.query); // ?a=1&b=2&c=3
  response.end('欢迎来到首页'+request.host+" "+request.path);
});
app.get('/:id/:name',function(request,response){//  http://localhost:8080/id/name
  console.log(request.params); // 
  response.send(request.params.id+" "+request.params.name);
});
app.get('/signup ', function(request, response) {
 response.end('注册')
});
app.get('/signin', function(request, response) {
 response.end('登录')
});
app.get('/signout', function(request, response) {
 response.end('退出')
});

app.get('/about', function(request, response) {
  response.end('欢迎来到关于我们');
})

app.all("*",function(req,res){
  res.send("ni fang wen de lu jing bu cun zai");
 })
app.listen(8080);
//思考: express的本质上是什么，是如何工作的
//  是对 http 核心模块的封装
