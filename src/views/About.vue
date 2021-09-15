<template>
  <v-card>
    <h1>This is an about page {{val}}</h1>
  </v-card>
</template>



<script>
export default {
  name: "About",

  mounted() {
    setInterval(() => {
      this.asdf();
    }, 1000);
  },
  watch: {},
  methods: {
    asdf() {
      this.val = this.val + 1;
    }
  },

  data: () => ({
    val: 1
  })
};
</script>
