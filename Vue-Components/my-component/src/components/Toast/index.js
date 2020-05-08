import myToast from './Toast.vue';


function isEmptyObject(o) {
  return typeof o === 'object' && (o === null || Object.keys(o).length === 0);
}

class Task {
  constructor() {
    this.list = [];
    this.active = false;
    this.ToastConstructor = null;
  }

  addTask(toastConfig) {
    this.list.push(toastConfig);
    if (!this.active) {
      this.active = true;
      const config = this.nextTask();
      showToast(config);
    }
  }

  nextTask() {
    return this.list.shift();
  }
}

const task = new Task();

function showToast({
  type = null, content = undefined, cancel = {}, confirm = {}, icon = null, duration = 1500,
}) {
  if (typeof content !== 'string') {
    console.warn('content 预期值是String');
    content = `${content}`;
  }
  const instance = new task.ToastConstructor();
  const el = instance.$mount().$el;
  instance.config.content = content;
  instance.config.type = type;
  if ([isEmptyObject(cancel), isEmptyObject(confirm)].every((v) => v)) {
    instance.config.button.cancel.show = false;
    instance.config.button.confirm.show = false;
    appendChild(el);
    setTimeout(() => {
      closeToast(instance, el)();
    }, duration);
  } else {
    [[instance.config.button.cancel, cancel], [instance.config.button.confirm, confirm]].forEach(([originOption, params]) => {
      originOption.show = params && params.show;
      originOption.text = params.text || originOption.text;
      originOption.color = params.color || originOption.color;
      originOption.handler = params.handler || originOption.handler;
    });
    if (typeof icon === 'string') {
      instance.config.icon = icon;
    }
    appendChild(el);
    closeToast(instance, el);
  }
}

function closeToast(instance, el) {
  const oldCloseToast = instance.closeToast;
  return instance.closeToast = () => {
    oldCloseToast.call(instance);
    el.parentNode.removeChild(el);
    const nextTask = task.nextTask();
    task.active = false;
    if (nextTask) {
      setTimeout(() => showToast(nextTask), 150);
    }
  };
}
function appendChild(el) {
  document.body.appendChild(el);
}

const Toast = {
  name: 'Toast',
  component: myToast,
  install(Vue) {
    const proto = Vue.prototype;
    /**
     * Toast params config
     * @param {} config
     * config: {
     *
     *  type?: fail || success || null
     *
     *  content!:  必须传入
     *  icon: 图片路径
     *  cancel: {
     *   show?: cancel && cancel.show
     *   text?: cancel.text || 下次再说
     *   color?: cancel.color || #9093A3、
     *   handler: cancel.handler || () => {}
     *  }
     *
     *  confirm: {
     *   show?: confirm && confirm.show
     *   text?: confirm.text || 好的
     *   color?: confirm.color || #00A3F5
     *   handler: confirm.handler || () => {}
     *  }
     *
     * }
     */
    proto.$toast = (config) => {
      task.ToastConstructor = Vue.extend(myToast);
      task.addTask(config);
    };
  },
};

export default Toast;
