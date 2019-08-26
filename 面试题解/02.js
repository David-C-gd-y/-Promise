class Scheduler {
  constructor() {
    this.tasks = [];
    this.taskAction = 0;
    this.concurrent = 2;
  }
  add(promiseCreator) {
    return new Promise(resolve =>{
      this.tasks.push(() => promiseCreator().then(resolve));
      this.runTask();
    })
  }
  runTask() {
    if (this.taskAction >= this.concurrent) return;
    const currentTask = this.tasks.shift();
    this.taskAction ++;
    if(currentTask) {
      currentTask().then(()=>{
        this.taskAction -=1;
        this.runTask()
      })
    }
  }
}
const timeout = timer => new Promise(resolve => setTimeout(resolve, timer));
const scheduler = new Scheduler();
const addTask = (time, order) => {
  scheduler
    .add(() => timeout(time))
    .then(() => {
      console.log(order);
    });
};
addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");

// output: 2 3 1 4


