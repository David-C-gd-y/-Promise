// create-element
function h(tag, props, children) {
  let key = props.key;
  delete props.key;
  children = children.map(child => {
    if (typeof child === "object") {
      return child;
    } else {
      return VNode(undefined, undefined, undefined, undefined, child);
    }
  });
  return VNode(tag, props, key, children);
}