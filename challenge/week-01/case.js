let Promise = require('./promise')
new Promise((resolve, reject)=>{
  resolve('s')
  reject('shibai')
}).then(r =>{
  console.log(r)
},e => {
  console.log(e)
})