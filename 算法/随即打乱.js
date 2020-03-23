// 随机数打乱

function shuffle (arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    const j = i + Math.floor(Math.random() * (arr.length - 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr;
}
console.log(shuffle([1, 2, 3, 4]))
