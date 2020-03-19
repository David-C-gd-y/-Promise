### vnode的类型有几种；
 注释节点；
 文本节点；
 元素节点；
 组件节点；
 函数式节点；
 克隆节点；

### patch过程简单总结
  当 oldVnode 不存在的时候，直接使用 vnode 渲染视图；
  当 oldVnode 和 vnode 都存在，但是并不是同一个节点时， 使用 vnode 创建 dom 元素直接替换旧的 dom 元素；
  当 oldVnode 和 vnode 是同一个节点的时候，使用更加详细的比对操作对真实 dom 进行更新；

### patch 流程图

   patch
    |
    |
  oldVnode是否存在  --- 不存在 ---> (使用vnode创建节点并插入视图)
    |
    |
   存在
    |
    |
oldVnode和Vnode是否同一个节点 ---- 是 ----> (使用patchVnode进行更加详细的比对)
    |
    |
  不是
    |
    |
使用vnode创建真实节点并插入到视图中，并删除旧节点

