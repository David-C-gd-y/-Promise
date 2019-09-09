
class Star {
  constructor(name) {
    this.name = name;
    this.state = null;
    this.observers = [];
  }
  getState () {
    return this.state;
  }
  setState (state) {
    this.state = state;
    this.notifyAllObserver()
  }
  addObservers (observer) {
    this.observers.push(observer);
  }
  notifyAllObserver () {
    if (this.observers.length > 0) {
      this.observers.forEach(observer => observer.update())
    }
  }
}

class Fans {
  constructor(name, star) {
    this.name = name;
    this.star = star;
    this.star.addObservers(this);
  }
  update () {
    console.log(`${this.star.name}${this.star.getState()}`)
  }
}

const star = new Star('大卫');
const fans1 = new Fans('张三', star)
star.setState('睡觉了')
