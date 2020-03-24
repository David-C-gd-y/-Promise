/**
  目的：节约性能
  先把真实的节点 用一个对象表示出来， 在通过对象渲染到页面上

  前端操作dom的适合 排序 -》 正序反序 删除

  diff 新的节点 再生成一个对象

  虚拟 dom 只是一个对象
   vue template render 函数

  例如： <div>Hello</div>
  用 VNode 表示
  {
    tag: 'div',
    prop: {},
    children: [
      {
        tag: undefined,
        prop: undefined,
        children: undefined,
        text: 'Hello'
      }
    ]
  }
  如果是用render函数表示：
  new Vue({
    render(h) {
      return h('div',{}, 'hello')
    }
  })
*/

// 初始化 将虚拟节点 渲染到页面
//  <div id="container"><span style="color:red;">hello</span>test</div>

let oldVNode = h("div", { id: "container" }, [
  h("li", { style: "background-color:green;", key: "d" }, ["d"]),
  h("li", { style: "background-color:blue;", key: "c" }, ["c"]),
  h("li", { style: "background-color:red;", key: "b" }, ["b"]),
  h("li", { style: "background-color:pink;", key: "a" }, ["a"])
]);

let container = document.getElementById("app");
render(oldVNode, container);

let newVNode = h("div", { id: "aa" }, [
  h("li", { style: "background-color:pink;", key: "v" }, ["v"]),
  h("li", { style: "background-color:red;", key: "g" }, ["g"]),
  // h("li", { style: "background-color:blue;", key: "n" }, ["n"]),
  // h("li", { style: "background-color:green;", key: "r" }, ["r"]),
  // h("li", { style: "background-color:pink;", key: "a" }, ["a"]),
  // h("li", { style: "background-color:red;", key: "b" }, ["b"]),
  // h("li", { style: "background-color:blue;", key: "c" }, ["c"]),
  // h("li", { style: "background-color:green;", key: "d" }, ["d"]),
]);

setTimeout(() => {
  patch(oldVNode, newVNode);
}, 1500);
