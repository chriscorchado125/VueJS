<template lang="pug">

  main.container.homepage(role="main")
    h1 About Me

    if error
      p #{ error }

    span(v-html="this.homeDescription")
    
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import HomeService from "./../../services/HomeService";

@Component
export default class Home extends Vue {
  data: Array<any> = [];
  error = "";
  homeDescription = "";

  async created() {
    try {
      this.data = await HomeService.getHome();
      this.$store.commit("setRecords", this.data);
      this.homeDescription = this.data[0].home.description;
    } catch (err) {
      this.error = err.message;
    }
  }

  mounted() {
    const titleEl: any = document.querySelector("head title");
    titleEl.textContent = "Chris Corchado - Homepage - Portfolio and Resume";
  }
}
</script>

<style scoped lang="scss">
@import "./../../scss/pages/home.scss";
</style>
