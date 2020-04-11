import Vue from "vue";

let vm = new Vue({
  el: '#app',
  data() {
    return {
      msg: 'hello vue',
      company: {
        name: '软通动力',
      },
      a: {
        b:{ c: {}}
      },
      arr: [{a:1}, 2, 3]
    }
  },
  computed: {

  },
  watch: {

  }
});

// 对原生方法进行劫持
console.log(vm.arr[0]['a'] = 100)