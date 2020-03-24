### VNode的类型有几种；
 注释节点；
 文本节点；
 元素节点；
 组件节点；
 函数式节点；
 克隆节点；

### patch UpdateProperties 逻辑分析
  patch oldVNode, 三种情况
  判断 node.tag 是不是存在;
  不存在: 意味着是一个 文本节点;

  判断 node.tag 是不是同一个
  不是,直接替换掉;

  如果是同一个tag, 复用，然后更新当前node 的属性;
  如果有child, 就递归往下继续 patch


### dom diff 算法详解

dom diff 实际上是 patch 的一部分， 也是 核心之一， 但是，是最复杂的实现；
  diff使用的核心策略： 双针对比对；
  比对条件：一组新的VNode，一组旧的VNode；
  为了处理有可能出现的情况，生成了 四个指针，分别是：
```js
let newStartIndex = 0;
let newEndIndex = newVNodes.length - 1;

let oldStartIndex = 0;
let oldEndIndex = oldVNodes.length - 1;
```
总结，一组数据有可能发生的情况，分别做了以下的几种判断；

校验方式：分别获取到对应索引的 element，通过VNode 的 tag、key 两个属性 进行校验是否可以复用


情况一：oldVNodes 左边 和 newVNodes 左边
  取 newStartIndex，oldStartIndex，两个指针, 如果可以复用, newStartIndex 自增,
  oldStartIndex 自增
情况二：oldVNodes 右边 和 newVNodes 右边
  取 newEndIndex，oldEndIndex，两个指针，如果可以复用, newEndIndex 自减, oldEndIndex 自减;
情况三: oldVNodes 左边 和 newVNodes 右边
  取 oldStartIndex，newEndIndex，两个指针，如果可以复用, newEndIndex 自减, oldStartIndex 自增;
情况四: oldVNodes 右边 和 newVNodes 左边
   取 oldEndIndex，newStartIndex，两个指针，如果可以复用, oldEndIndex 自减, newStartIndex 自增;
情况五: 新旧两组VNodes,的左右两边，没有一个是可以复用的;
  这种情况 先用 oldChildren, 生成一个map;
  ```js
  // 源码是叫： createKeyToOldIdx
  function getIndexByKey(oldChildren,oldStartIndex, oldEndIndex) {
     let map = {}, i, key;
     for(i = oldStartIndex; i <= oldEndIndex; i++){
       key = oldChildren[i].key;
       if (key) {
        map[key] = i;
       }
     }
     return map;
   };
  ```
每次比对的时候, 从map里面去一次值
```js
 // 这样就相当于遍历了一次了;
 let oldKeyToIndex = map[newVNodes[newStartIndex.key]];
 // 如果 index 不存在
 if (oldKeyToIndex == undefined) {
   // 创建元素，然后插入到oldVNodes 的最左边;
 } else {
   // 如果存在则 复用
   // 复用策略：将 olcChildren[oldKeyToIndex] 这个元素，移动到 oldStartIndex前面
  let willMoveElement = oldChildren[oldKeyToIndex];
  // 防止数组塌陷，赋值占位符
  oldChildren[oldKeyToIndex] = undefined;
  // parent 是父级节点， 插入oldStartIndex左边
  parent.insertBefore(willMoveElement, oldVNodes[oldStartIndex]);
  // 更新 properties
  patch(willMoveElement.el, oldChildren[oldStartIndex].el);
 }

```