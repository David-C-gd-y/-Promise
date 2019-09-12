let EventEmitter = require('./events');
let util = require('util');
// on 绑定 时间 emit发射事件

// __proto__
// Object.create
// Object.setPrototypeof

function Girl () {

}
util.inherits(Girl, EventEmitter)
let girl = new Girl();
let cry = (thing) => {
  console.log('哭了', thing)
};
girl.on('newListener', (eventType) => {
  // process.nextTick(() => {
  girl.emit(eventType)
  // })
  // console.log(type) // 每次触发on方法的时候 就会先执行这个方法，才把回调加入
})
girl.on('女生失恋', cry); // addListener  订阅
girl.on('女生失恋', cry); // addListener  订阅

let drink = () => {
  console.log('喝奶');
}
// girl.once('女生失恋', drink)
// girl.off('女生失恋', cry); // 发布

girl.emit('女生失恋', '被劈腿了') // node 10 + 取消订阅
// girl.emit('女生失恋', '被劈腿了')
// girl.off('女生失恋', cry); // 发布

// 接受数据 流


