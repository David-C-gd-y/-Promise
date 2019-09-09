class Dispatch {
  constructor() {
    this.keys = {}
  }
  on (key, f, ctx) {
    if (!this.keys[key]) {
      this.keys[key] = []
    }
    this.keys[key].push({ f, ctx })
  }

  emit (key, params) {
    let fns = this.keys[key] || [];
    fns.forEach(item => {
      const { f, ctx } = item;
      f.call(ctx, params)
    });
  }
}

class Student {
  constructor(name) {
    this.name = name
  }
  study (param) {
    console.log('我的名字： ', this.name)
    console.log('我在学习： ', param)
  }
}
const student = new Student('大卫');
const student2 = new Student('大卫2');

const dispatch = new Dispatch()
dispatch.on('study', student.study, student);
dispatch.on('study', student2.study, student2);
dispatch.emit('study', 'coding')
