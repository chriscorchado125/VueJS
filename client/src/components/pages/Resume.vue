<template lang="pug">

  main.container(role="main" v-if="dataLoaded")

    h1(id='content') Resume

    if error
      p #{ error }

    span(v-html="this.resumeHTML")

</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import ResumeService from "./../../services/ResumeService";

@Component
export default class Resume extends Vue {
  data: Array<any> = [];
  dataLoaded = false;
  error = "";
  resumeHTML = "";

  async created() {
    try {
      this.data = await ResumeService.getResume();
      this.$store.commit("setRecords", this.data);
      this.resumeHTML = this.data[0].home.html;
      this.dataLoaded = true;

    } catch (err) {
      this.error = err.message;
    }
  }

  mounted() {
    const titleEl: any = document.querySelector("head title");
    titleEl.textContent = "Chris Corchado - Resume";
  }
}
</script>

<style lang="scss">
@import "./../../scss/pages/resume.scss";
</style>
