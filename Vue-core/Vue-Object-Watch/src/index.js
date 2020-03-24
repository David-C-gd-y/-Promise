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
      arr: [1, 2, 3]
    }
  },
  computed: {

  },
  watch: {

  }
});
