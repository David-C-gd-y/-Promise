<script>
function isPromise(obj) {
  return !!obj // 有实际含义的变量才执行方法，变量null，undefined和''空串都为false
  && (typeof obj === 'object' || typeof obj === 'function') // 初始promise 或 promise.then返回的
  && typeof obj.then === 'function';
}

export default {
  name: 'Toast',
  data() {
    return {
      config: {
        type: null,
        button: {
          cancel: {
            id: 'cancel',
            show: true,
            text: '下次再说',
            color: '#9093A3',
            handler: () => {},
          },
          confirm: {
            id: 'confirm',
            show: true,
            text: '好的',
            color: '#00A3F5',
            handler: () => {},
          },
        },
        content: '',
        icon: null,
      },
      failIcon: require('@/assets/fail-icon.png'),
      successIcon: require('@/assets/success-icon.png'),
    };
  },
  computed: {
    buttons() {
      const {
        config: { button },
      } = this;
      return Object.keys(button)
        .filter((btn) => button[btn].show)
        .map((btn) => button[btn]);
    },
    isEmptyButtons() {
      return this.buttons.length === 0;
    },
    hasIcon() {
      return !!this.config.icon;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.freezePage();
      try {
        const { type } = this.config;
        if (type) {
          const icon = this[`${type}Icon`];
          if (icon && this.config.icon === null) {
            this.config.icon = icon;
          }
        }
      } catch (error) {
        console.error(error);
      }
    });
  },
  beforeDestroy() {
    this.activePage();
  },
  methods: {
    closeToast() {
      this.$destroy();
    },
    freezePage() {
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    },
    activePage() {
      document.getElementsByTagName('body')[0].style.overflow = '';
    },
    async handlerButtonClick(cb) {
      if (isPromise(cb)) {
        await cb();
        this.closeToast();
      } else {
        cb();
        this.closeToast();
      }
    },
    dyStyleForDescription() {
      return {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: '1',
      };
    },
  },
  render() {
    return (
      <div class="toast-layout__container">
        <div
          style={this.isEmptyButtons ? { minHeight: 'auto' } : null}
          class={['toast-layout__msg-container']}
        >
          <div
            role="button"
            style={this.isEmptyButtons ? { padding: '1rem' } : null}
            class="msg-container__main"
          >
            <div
              style={this.hasIcon ? null : { paddingTop: '0' }}
              class={['content-box', !this.isEmptyButtons ? 'is-dialog' : '']}
            >
              {this.hasIcon ? (
                <div role="icon" class="icon-box">
                  <img class="icon" src={this.config.icon} />
                </div>
              ) : null}
              <div
                role="description"
                style={this.hasIcon ? null : this.dyStyleForDescription}
                class="description-box"
              >
                {this.config.content}
              </div>
            </div>
          </div>
          {!this.isEmptyButtons ? (
            <div class="msg-container__footer">
              {this.buttons.map((btn, index) => (
                <div
                  on-click={this.handlerButtonClick.bind(this, btn.handler)}
                  key={btn.id}
                  role="button"
                  ref={`button—${index}`}
                  style={{ color: btn.color }}
                  class="footer-button"
                >
                  {btn.text}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    );
  },
};
</script>
<style scoped>
.toast-layout__container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 2000;
}
.toast-layout__msg-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16.81rem;
  min-height: 13.5rem;
  max-height: 23.5rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.88rem;
  display: flex;
  flex-direction: column;
}
.msg-container__main {
  flex: 1;
  padding: 0.81rem 1rem 0;
  display: flex;
  overflow: hidden;
}
.content-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 4.94rem;
}
.is-dialog.content-box {
  justify-content: center;
}
.icon-box {
  position: absolute;
  top: 0.81rem;
  left: 50%;
  transform: translateX(-50%);
  width: 4.94rem;
  height: 4.94rem;
  min-height: 4.94rem;
  max-height: 4.94rem;
  margin: 0 auto;
}
.icon-box .icon {
  width: 100%;
  height: 100%;
}
.description-box {
  overflow-y: auto;
  height: auto;
  word-wrap: break-word;
  word-break: break-all;
  text-align: center;
}

.msg-container__footer {
  display: flex;
  height: 2.94rem;
  min-height: 2.94rem;
}
.footer-button {
  flex: 1;
  box-sizing: border-box;
  border-top: 1px solid #edeff5;
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer-button + .footer-button {
  box-sizing: border-box;
  border-left: 1px solid #edeff5;
}
</style>
