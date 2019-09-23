let url = require('url');

let { query, pathname } = url.parse('https://username:password@www.baidu.com:443/index.html?a=1#abc', true);

console.log(query, pathname)

