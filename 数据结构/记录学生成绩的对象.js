// 记录学生成绩 
// 实现添加学生成绩 
// 实现获取平均分

class StudentAchievement {
  constructor() {
    this.class = [];
  }
  addAchievement (student, achievement) {
    this.class.push({ student, achievement });
  }
  getAverageValue () {
    console.log('平均分为:' + (this.class.map(i => i.achievement).reduce((a, b) => {
      return a + b;
    })) / this.class.length);
  }
};

let sa = new StudentAchievement();
sa.addAchievement('小城', 89);
sa.addAchievement('小路', 65);
console.log(sa.getAverageValue())