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
import animateLogo from "./../../ts/animateLogo";

@Component
export default class Resume extends Vue {
  data: Array<any> = [];
  dataLoaded = false;
  error = "";
  resumeHTML = "";

  async created(): Promise<void> {
    try {
      this.data = await ResumeService.getResume();
      this.$store.commit("setRecords", this.data);
      this.resumeHTML = this.data[0].home.html;
      this.dataLoaded = true;
      animateLogo('logo-image', '');
    } catch (err) {
      this.error = err.message;
    }
  }

  mounted(): void {
    animateLogo('logo-image', 'spin');

    if (document.querySelector("head title")) {
      const titleEl = document.querySelector("head title");
      if (titleEl) {
        titleEl.textContent = "Resume | Chris Corchado";
      }
    }
  }
}
</script>

<style lang="scss">
@import "./../../scss/pages/resume.scss";
</style>
