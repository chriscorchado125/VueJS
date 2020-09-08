<template lang="pug">

  main.container(role="main")
    h1 About Me

    if error
      p #{ error }

    span(v-html="this.homeDescription")
    
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import HomeService from "./../services/HomeService";

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
}
</script>

<style lang="scss">
@import "./../scss/home.scss";
</style>
