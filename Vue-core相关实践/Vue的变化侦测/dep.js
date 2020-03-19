class Dep {
  constructor () {
    this.subs = [];
  }

  addSub (sub) {
    this.subs = sub;
  }

  depend() {
    if (process.myWindow.target) {
      this.addSub(process.myWindow.target);
    }
  }

  removeSub(sub) {
    remove(this.subs, sub)
  }

  notify() {
    this.subs.forEach(sub => sub.update());
  }
};

function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
};

process.myWindow = {target:undefined};

module.exports = {
  Dep
}