<template lang="pug">

  footer#footer

    div#html.site-version(aria-label="Icons of the technology used on this site and link to Github")

      div
        img(alt="VueJS Icon" title="VueJS for the frontend framework" src="https://chriscorchado.com/images/footer/vuejs.png")
      div
        img(alt="nodeJS Icon" title="nodeJS for the platform" src="https://chriscorchado.com/images/footer/nodejs.png")
      div
        img(alt="Express Icon" title="Express for the backend framework" src="https://chriscorchado.com/images/footer/express.png")
      div
        img(alt="mongoDB Icon" title="mongoDB for the database" src="https://chriscorchado.com/images/footer/mongodb.png")
      div
        img(alt="mongoose Icon" title="mongoose to connect to the mongoDB database" src="https://chriscorchado.com/images/footer/mongoose.png")
      div
        img(alt="TypeScript Icon" title="TypeScript for Javascript functionality" src="https://chriscorchado.com/images/footer/typescript.png")
      div
        img(alt="SASS Icon"  title="SASS for the CSS look and feel styles" src="https://chriscorchado.com/images/footer/sass.png")
      div
        img(alt="Pug Icon" title="Pug for the HTML content templates" src="https://chriscorchado.com/images/footer/pugjs.png")
      div
        img(alt="HTML5 Icon" title="HTML5 for overall structure" src="https://chriscorchado.com/images/footer/html5.png")
      div
        a(href="https://github.com/chriscorchado125/VueJS" target="_blank" rel="noopener" title="Opening a new window")
          img(alt="Github Icon" title="View the code on Github" src="https://chriscorchado.com/images/footer/github.jpg")

</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class SiteFooter extends Vue {}
</script>
