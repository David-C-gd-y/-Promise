class SaveWord {
  constructor() {
    this.words = [];
  }
  addWords (w) {
    if (Array.isArray(w)) {
      this.words = this.words.concat(w);
      return;
    }
    this.words.push(w + '')
  }
  toString () {
    return this.words.slice()
  }
  toStringRight () {
    return this.words.slice().reverse()
  }
}

let sw = new SaveWord();
sw.addWords(1)
sw.addWords(2)
sw.addWords(3)
sw.addWords(4)
console.log(sw.toString());
console.log(sw.toStringRight());