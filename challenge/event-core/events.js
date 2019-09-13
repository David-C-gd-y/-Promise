module.exports = class EventEmitter {
  constructor() {
    this._event = {};
  }
  /** 
   * newListener 在_event 对象里面 负责监听，新加入的事件
   * 
   * 
   */
  on (eventType, callback) {
    if (eventType !== 'newListener') {
      this._event['newListener'] ? this._event['newListener'].forEach(f => f(eventType)) : void 0;
    }
    if (!this._event) this._event = {}; // 被继承以后， 实例属性没办法被 子类拿到_event 只能在on 的时候给子类添加上
    if (!this._event[eventType]) this._event[eventType] = [];
    this._event[eventType].push(callback);
  }
  once (eventType, callback) {
    let one = (...arg) => {
      callback(arg)
      this.off(eventType, one);
    }
    one.l = callback;
    this.on(eventType, one);
  }
  off (eventType, callback) {
    if (!this._event) this._event = {};
    if (!this._event[eventType]) return;
    let newListener = this._event[eventType].filter(fn => {
      return fn != callback && fn.l !== callback
    })
    if (this._event[eventType].length !== newListener.length) {
      this._event['removeListener'] ? this._event['removeListener'].forEach(f => f(eventType)) : void 0;
    }
  }
  emit (eventType) {
    if (!this._event) this._event = {};
    if (!this._event[eventType]) return;
    this._event[eventType].forEach(fn => fn.call(this, ...[].slice.call(arguments, 1)))
  }
}
