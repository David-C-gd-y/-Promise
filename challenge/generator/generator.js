/**
 *  co 核心源码
 * 
 */

function co (gen) {
  var ctx = this;
  var args = slice.call(arguments, 1);

  return new Promise(function (resolve, reject) {
    if (typeof gen === 'function') gen = gen.apply(ctx, args);
    if (!gen || typeof gen.next !== 'function') return resolve(gen);

    onFulfilled();

    function onFulfilled (res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
      return null;
    }

    function onRejected (err) {
      var ret;
      try {
        ret = gen.throw(err);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }
    function next (ret) {
      // 如果 done 是完成的 直接完成；
      if (ret.done) return resolve(ret.value);
      // 如果没有完成, 先转 promise 
      var value = toPromise.call(ctx, ret.value);

      if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
      // 用工具转完以后，在返回一个新的promise

      return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
        + 'but the following object was passed: "' + String(ret.value) + '"'));
    }
  });
}

function toPromise (obj) {
  // 接受一个 任何参数
  if (!obj) return obj; // 如果为 空 直接返回
  if (isPromise(obj)) return obj;
  if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj); // 如果 不是 Generator ，函数 直接转 promise
  if ('function' == typeof obj) return thunkToPromise.call(this, obj); // 如果是普通函数 直接用 promise 包装
  if (Array.isArray(obj)) return arrayToPromise.call(this, obj); // 如果是 数组 用promise all 返回一个 新的promise
  if (isObject(obj)) return objectToPromise.call(this, obj); // 如果是一个对象， 就先遍历每一个 key、value ,然后 递归调用 toPromise 函数来转成 promise， 每个value 都转成 promise.then 的函数

  return obj;
}


function thunkToPromise (fn) {
  var ctx = this;
  return new Promise(function (resolve, reject) {
    fn.call(ctx, function (err, res) {
      if (err) return reject(err);
      if (arguments.length > 2) res = slice.call(arguments, 1);
      resolve(res);
    });
  });
}


function arrayToPromise (obj) {
  return Promise.all(obj.map(toPromise, this));
}
function objectToPromise (obj) {
  var results = new obj.constructor();
  var keys = Object.keys(obj);
  var promises = [];
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var promise = toPromise.call(this, obj[key]);
    if (promise && isPromise(promise)) defer(promise, key);
    else results[key] = obj[key];
  }
  return Promise.all(promises).then(function () {
    return results;
  });

  function defer (promise, key) {
    // predefine the key in the result
    results[key] = undefined;
    promises.push(promise.then(function (res) {
      results[key] = res;
    }));
  }
}

function isPromise (obj) {
  return 'function' == typeof obj.then;
}


function isGenerator (obj) {
  return 'function' == typeof obj.next && 'function' == typeof obj.throw;
}

function isGeneratorFunction (obj) {
  var constructor = obj.constructor;
  if (!constructor) return false;
  if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;
  return isGenerator(constructor.prototype);
}

function isObject (val) {
  return Object == val.constructor;
}