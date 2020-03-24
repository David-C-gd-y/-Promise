// 接下来除了 初始化渲染 还要 patch
function render(vnode, container) {
  let el = createElm(vnode);
  container.appendChild(el);
}
function createElm(vnode) {
  let { tag, children, key, props, text } = vnode;
  if (typeof tag === "string") {
    // 标签
    vnode.el = document.createElement(tag);
    // properties update
    updateProperties(vnode);
    children.forEach(function(child) {
      // child 是虚拟的节点
      return render(child, vnode.el); // 递归
    });
  } else {
    // 文本
    vnode.el = document.createTextNode(text);
  }
  return vnode.el;
}

function updateProperties(vnode, oldProps = {}) {
  function elementStyleSetup(el, style) {
    if (typeof style === "string") {
      el.style = style;
      return;
    }
    for (const styleName in style) {
      el.style[styleName] = style[styleName];
    }
  }
  let newProps = vnode.props || {}; // 获取当前老节点中的属性
  let el = vnode.el;
  let newStyle = newProps.style || {};
  let oldStyle = oldProps.style || {};
  // 因为 newProps 会覆盖掉 oldProps 相同的key/value；
  // 所以 删除掉 newProps 不存在，而 oldProps 存在的key
  for (const key in oldProps) {
    if (!newProps[key]) {
      // 因为 oldProps 的属性已经存在 el了，所以 直接patch el
      delete el[key];
    }
  }
  for (const key in oldStyle) {
    if (!newStyle[key]) {
      el.style[key] = "";
    }
  }
  for (const key in newProps) {
    if (key === "style") {
      elementStyleSetup(el, newProps.style);
    } else if (key === "class") {
      el.className = newProps.class;
    } else {
      el[key] = newProps[key];
    }
  }
}
// core
function patch(oldVNode, newVNode) {
  // 所有情况 都是根据 oldVNode 为出发点，和 newVNode 比对
  // VNode 属性 tag 比对
  if (oldVNode.tag !== newVNode.tag) {
    oldVNode.el.parentNode.replaceChild(createElm(newVNode), oldVNode.el);
  }
  // VNode 属性 text 比对
  if (!oldVNode.tag) {
    if (oldVNode.text !== newVNode.text) {
      // 有可能产生疑惑，因为要和比对的是 VNode 实例做比对
      // 所以 只考虑 VNode 存在的属性即可， 所以不需要多假设什么 万一是 newVNode 是tag，旧标签是 text呢？ 不考虑这种情况
      oldVNode.el.textContent = newVNode.text;
    }
  }
  // VNode 属性 props 比对
  // tag 一样意味着可以复用 同一个标签，不需要重新再内存中生成一个新的同名tag；
  let el = (newVNode.el = oldVNode.el);
  // 参数传入
  updateProperties(newVNode, oldVNode.props);
  let oldChildren = oldVNode.children || [];
  let newChildren = newVNode.children || [];
  // VNode 属性 children 比对
  if (oldChildren.length > 0 && newChildren.length > 0) {
    // 如果都有 children
    // patching 的核心 虚拟dom的核心更新算法；
    updateChildren(el, oldChildren, newChildren);
  } else if (oldChildren.length > 0) {
    // 如果 只有newVNode的 children 没有， 那么直接清空掉
    el.innerHTML = "";
  } else if (newChildren.length > 0) {
    // 如果 oldVNode 的 children 没有， 直接appendChild到el中
    for (let i = 0; i < newChildren.length; i++) {
      let child = newChildren[i];
      // 此时 newChildren 还是 VNode ，所以需要调用 createElm
      el.appendChild(createElm(child));
    }
  }
}
function isSameVNode(a, b) {
  return a.tag === b.tag && a.key === b.key;
}

function getIndexByKey(children, beginIndex, endIndex) {
  let map = {},
    key;
  for (let index = beginIndex; index <= endIndex; index++) {
    key = children[index].key;
    if (key) {
      map[key] = index;
    }
  }
  return map;
}

function updateChildren(parent, oldChildren, newChildren) {
  // 尽可能的复用已有的元素
  // 先把头尾的引用 和索引 保存起来
  let oldStartIndex = 0;
  let newStartIndex = 0;
  let oldEndIndex = oldChildren.length - 1;
  let newEndIndex = newChildren.length - 1;
  let oldStartVNode = oldChildren[0];
  let oldEndVNode = oldChildren[oldEndIndex];
  let newStartVNode = newChildren[0];
  let newEndVNode = newChildren[newEndIndex];
  let map, oldKeyToIndex;

  // 条件是： 因为比对的是两个list， 如果短的list 越界了 就终止循环
  while (newStartIndex <= newEndIndex && oldStartIndex <= oldEndIndex) {
    if (!oldStartVNode) {
      // 如果 oldStartVNode 是一个占位符那么直接跳过
      // 因为 map[key] 的方式，直接命中 就会被替换掉 所以无法预知 到底是那个元素被 置换成占位符
      // 所以 在最前面添加 关于 old的 头尾指针 指向占位符的处理；
      oldStartVNode = oldChildren[++oldStartIndex];
    } else if (!oldEndVNode) {
      // 如果 oldEndVNode 是一个占位符那么直接跳过
      oldEndVNode = oldChildren[--oldEndIndex];
    } else if (isSameVNode(oldStartVNode, newStartVNode)) {
      // 组合1，头头相比: 比对 oldStartVNode 和 newStartVNode 是同一个元素，用newVNode就 patch oldVNode
      patch(oldStartVNode, newStartVNode);
      oldStartVNode = oldChildren[++oldStartIndex];
      newStartVNode = newChildren[++newStartIndex];
    } else if (isSameVNode(oldEndVNode, newEndVNode)) {
      // 组合2，尾尾相比： 比对 新旧 两个尾部的 VNode
      patch(oldEndVNode, newEndVNode);
      oldEndVNode = oldChildren[--oldEndIndex];
      newEndVNode = newChildren[--newEndIndex];
    } else if (isSameVNode(oldStartVNode, newEndVNode)) {
      // 组合3， 头尾相比： 比对 旧头和新尾 是不是相同元素
      patch(oldStartVNode, newEndVNode);
      // patch 完毕以后，会有一个移动的操作；
      // 往右插入 可以调用 oldEndVNode.el.nextSibling 拿到next元素， 如果next不存在则返回null；
      parent.insertBefore(oldStartVNode.el, oldEndVNode.el.nextSibling);
      oldStartVNode = oldChildren[++oldStartIndex];
      newEndVNode = newChildren[--newEndIndex];
    } else if (isSameVNode(oldEndVNode, newStartVNode)) {
      // 组合4， 尾头相比： 比对 旧尾 和 新头 是不是相同元素
      patch(oldEndVNode, newStartVNode);
      // 往左 插入，像左位移
      parent.insertBefore(newStartVNode.el, newChildren[newStartIndex + 1].el);
      oldEndVNode = oldChildren[--oldEndIndex];
      newStartVNode = newChildren[++newStartIndex];
    } else {
      // 乱序
      if (!map) map = getIndexByKey(oldChildren, oldStartIndex, oldEndIndex);
      oldKeyToIndex = map[newStartVNode.key];
      if (oldKeyToIndex == undefined) {
        //如果在map里面找不到 对应的key，则代表这是一个新元素；
        // 直接插入old的 startIndex的左边；
        parent.insertBefore(createElm(newStartVNode), oldStartVNode.el);
      } else {
        // 如果找到了 对象的key，意味着元素可以复用
        let canUserElement = oldChildren[oldKeyToIndex];
        oldChildren[oldKeyToIndex] = undefined; // undefined 此时是一个占位符；
        parent.insertBefore(canUserElement.el, oldStartVNode.el);
        patch(canUserElement, oldStartVNode);
      }
      newStartVNode = newChildren[++newStartIndex];
    }
  }
  // 如果是 oldChildren 的长度越界了， 证明newChildren的长度是比 oldChildren 长，多出来的元素，代表新增，再尾部插入
  if (newStartIndex <= newEndIndex) {
    // 循环体 为什么要 小于等于， 因为再上面的 while 循环里面， 多做了一个预操作，每次patch以后会 ++ 往右移动一位；
    for (let index = newStartIndex; index <= newEndIndex; index++) {
      // insertBefore 第二个元素是参考元素，是第一个参数的参考
      // 如果是正序 头头比对的情况， 要利用 insertBefore 第二个参数为null的情况，实现append的效果
      // 所以 参考元素，是 newChildren[newEndIndex+1] 的结果
      // 如果是 倒序 尾尾比对的情况，因为在 尾 尾 比对的情况是， newEndIndex 自减，当要在 0 的位置插入，+1 则可以获取到参考元素 【1】
      // 要注意的是 倒序从 0 拿VNode 是对的，往中间插入；
      // 继续从 0 拿，会从插入的位置，左边的元素都会 往左移动 1位；
      let ele = !newChildren[newEndIndex + 1]
        ? null
        : newChildren[newEndIndex + 1].el;
      parent.insertBefore(createElm(newChildren[index]), ele);
    }
  }

  if (oldStartIndex <= oldEndIndex) {
    for (let index = oldStartIndex; index <= oldEndIndex; index++) {
      let child = oldChildren[index];
      if (child) {
        parent.removeChild(child.el);
      }
    }
  }
}
