<template lang="pug">
  main.container(role="main")
    h1 About Me
    if error
      p #{ error }
    span(v-html="data[0].home.description")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HomeService from "./../services/HomeService";

@Component
export default class Home extends Vue {
  data = [];
  error = "";

  async created() {
    try {
      this.data = await HomeService.getHome();
    } catch (err) {
      this.error = err.message;
    }
  }

  setVersion() {
    //const el = document.getElementById("vueJS");
    //el.classList.add("shadow-version noLink");
    //document.getElementById("vueJS-here").style.display = "block";
  }
}
</script>

<style lang="scss">
@import "./../scss/home.scss";
</style>
