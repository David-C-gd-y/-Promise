// 简陋的 co库实现  async + await 原理

function co(gen) {
  if (typeof gen === 'function') gen = gen.call(this)
  return new Promise((resolve, reject) => {
    onFulfilled()
    function onFulfilled(res) {
      let result;
      result = gen.next(res);
      next(result);
    }
    function next(callResult) {
      if (callResult.done) return resolve(callResult.value);
      onFulfilled(callResult.value);
    }
  })
}


function* test() {
  let a = 1 + 2;
  yield 2;
  yield 3;
}
co(test).then(r => {
  console.log(r)
})