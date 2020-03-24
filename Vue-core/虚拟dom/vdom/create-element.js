
// v-dom 对象
function VNode(tag, props, key, children, text) {
  return {
    tag, // 表示的是当前的 标签民
    props, // 表示的是当前的标签属性
    key, // 唯一标识 用户可能传
    children,
    text
  };
}

