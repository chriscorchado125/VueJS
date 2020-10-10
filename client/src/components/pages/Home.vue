<template lang="pug">

  main.container.homepage(role="main" v-if="dataLoaded")

    h1(id='content' tabindex="12") About Me

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
  dataLoaded = false;
  error = "";
  homeDescription = "";

  async created() {
    try {
      this.data = await HomeService.getHome();
      this.$store.commit("setRecords", this.data);
      this.homeDescription = this.data[0].home.description;
      this.dataLoaded = true;

      setTimeout(function() {
        document.getElementById("html5-text").style.display = "none";
        document.getElementById("nodejs-text").style.display = "none";
        document.getElementById("vuejs-text").style.display = "inline-block";
        document.getElementById("drupal8-text").style.display = "none";
      }, 500);
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
