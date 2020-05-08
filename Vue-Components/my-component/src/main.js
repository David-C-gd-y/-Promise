import Vue from 'vue';
import Toast from '@/components/Toast';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.use(Toast);
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
