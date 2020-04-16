// ?: 代表忽略
// ? 尽可能少的匹配
const defaultRe = /\{\{((?:.|\r?\n)+?)\}\}/g;
export const util = {
  getValue(vm, expr) { /// 因为有可能传入的 表达式， name.a 
    return expr.split('.').reduce((memo, current) => memo = memo[current], vm);
  },
  compilerText(node, vm) {
    node.textContent = node.textContent.replace(defaultRe, function(...args) {
      return util.getValue(vm, args[1]);
    })
  }
};

export function compiler(node ,vm) {
  let childNodes = node.childNodes; // 获取到 子集，但不包括 子集以下的 集合
  [...childNodes].forEach(child => {
    if (child.nodeType === 1) {
      compiler(child, vm);
    } else if (child.nodeType === 3) {
      util.compilerText(child, vm);
    }
  })
};