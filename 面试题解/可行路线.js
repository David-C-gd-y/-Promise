/**
问题一
小明住在未来市，这个地方所有的道路都切割为完美的网格状。
有一天他与一位朋友有约，但他提前了十分钟抵达约定地点，所以他决定先去散散步。
这个城市为市民提供了一个Random Walk App，
每次按下执行便会发送一串代表行走方向且长度不定的单字字母字符串
（例如[‘n’, ’s’, ’w’, ’e’]及代表依序往北、南、西、东。小明只有十分钟，
每次一个方向就走一个街口刚好需要一分钟，若小明需要在十分钟后准时回到原点（不可过早或过晚），
请为小明设计一个方法名为walkValidator，

回传为true时代表Random Walk App生成的路线可以达到这个要求，
回传false则代表生成的路线无法达成。

function walkValidator(walk) {
 //在此输入你的方法内容
}
//一些测试可能如下...
Test.expect(walkValidator (['n','s','n','s','n','s','n','s','n','s']), ‘true');
Test.expect(!walkValidator (['w','e','w','e','w','e','w','e','w','e','e','w']), ‘false');
Test.expect(!walkValidator (['e']), ‘false');
Test.expect(!walkValidator (['n','n','n','s','n','e','e','s','s','s']), ‘false');
 */
const Test = {
  expect(target , result){
    if (typeof target == 'function') {
      return target() == result ? true : false
    } else {
      return target == result ? true : false
    }
  }
}
function walkValidator(walk) {
  //在此输入你的方法内容
  if (!walk.length && walk.length != 10) return false;
  let d = {
    n:1, // 北
    s:-1, // 南
    w:2, // 西
    e:-2 // 东 
  };
  let count = 0;
  walk.forEach(item => {
    if(d[item]) {
      count = count + d[item]
    }
  });
  return count == 0
 }
 //一些测试可能如下...
 console.log( Test.expect(walkValidator (['n','s','n','s','n','s','n','s','n','s']), true));
 console.log( Test.expect(!walkValidator (['w','e','w','e','w','e','w','e','w','e','e','w']), false));
 console.log( Test.expect(!walkValidator (!walkValidator (['e']), false)));
 console.log( Test.expect(!walkValidator (['n','n','n','s','n','e','e','s','s','s']), false));
