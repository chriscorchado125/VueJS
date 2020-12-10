<template lang="pug">

  main.container.homepage(role="main" v-if="dataLoaded")

    h1(id='content') About Me

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
  data: Array<unknown> = [];
  dataLoaded = false;
  error = "";
  homeDescription = "";

  async created(): Promise<void> {
    try {
      this.data = await HomeService.getHome();
      this.$store.commit("setRecords", this.data);
      // @ts-ignore
      this.homeDescription = this.data[0].home.description;
      this.dataLoaded = true;
    } catch (err) {
      this.error = err.message;
    }
  }

  mounted(): void {
    const titleEl = document.querySelector("head title");
    if (titleEl) {
      titleEl.textContent = "About Me | Chris Corchado";
    }
  }
}
</script>

<style lang="scss">
@import "./../../scss/pages/home.scss";
</style>
