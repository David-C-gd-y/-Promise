<template>
  <div class="home">
    <button @click="test">test--Toast</button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  methods: {
    test() {
      this.$toast({
        content: {},
        type: 'fail',
        cancel: {
          show: true,
        },
      });
      this.$toast({
        content: 123,
        type: 'success',
        confirm: {
          show: true,
        },
      });
      this.$toast({
        content: 123,
      });
    },
  },
};
</script>
