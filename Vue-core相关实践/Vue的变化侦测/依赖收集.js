 // 依赖收集在哪里
 /**
  思考一下， 之所以要观察数据变化，因为要通知那些曾经使用过数据的地方
  在vue 2.x的版本中，模板数据数据 等同于 组件使用数据，所以数据发生变化的时候，
  会把通知发送到组件，组件内部再通过 虚拟dom 重新渲染出来
  */
 // 假设 依赖是一个函数 ，保存在window.target上。
 function defineReactive(data, key ,value) {
   let dep = []; // 依赖存储
   return Object.defineProperty(data, key, {
     enumerable: true, // 可被遍历
     configurable: true, // 可以被编辑的属性，修改 或者 删除
     get: function() {
       dep.push(window.target)
       return value;
     },
     set: function(newValue) {
       if (value === newValue) return;
       for (let i = 0; i < dep.length; i++) {
         dep[i](newValue, value)
       };
       value = newValue;
     }
   });
 };
 // 仔细看看 有点发布订阅的味道