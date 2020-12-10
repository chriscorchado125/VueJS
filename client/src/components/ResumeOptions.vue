<template lang="pug">

  div#profiles

    div#pdf-resume.icon
      a(href="https://chriscorchado.com/resume/Chris-Corchado-resume-2020.pdf" target="_blank" rel="noopener" title="Opening a new window")
        img(alt="Link to PDF Resume" src="https://chriscorchado.com/images/pdfIcon.jpg")
        span PDF

    div#word-resume.icon
      a(href="https://chriscorchado.com/resume/Chris-Corchado-resume-2020.docx" title="File will download")
        img(alt="Link to MS Word Resume" src="https://chriscorchado.com/images/wordIcon.jpg")
        span Word

</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Profile extends Vue {}
</script>

<style scoped lang="scss">
@import "./../scss/header/profile.scss";
</style>
