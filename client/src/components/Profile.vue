<template lang="pug">

  div#profiles

    div#pdf-resume.icon
      a(href="/resume")
        img(alt="Link to HTML Resume with PDF and Word options" src="https://chriscorchado.com/images/htmlIcon.jpg")
        span Resume

    div#profile-linkedin.icon
      a(href="https://www.linkedin.com/in/chriscorchado/" target="_blank" rel="noopener" title="Opening a new window")
        img(alt="Link to LinkedIn Profile" src="https://chriscorchado.com/images/linkedInIcon.jpg")
        span LinkedIn

    div#profile-profile.icon
      a(href="https://docs.microsoft.com/en-us/users/corchadochrisit-2736/" target="_blank" rel="noopener" title="Opening a new window")
        img(alt="Link to Azure Profile" src="https://chriscorchado.com/images/azureIcon.jpg")
        span Azure

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
