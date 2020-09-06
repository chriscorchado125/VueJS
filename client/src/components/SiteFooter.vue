<template>
  <footer id="footer">
    <div
      class="site-version"
      id="html"
      aria-label="Icons of the technology used on this site and link to Github"
    >
      <div>
        <img
          alt="VueJS Icon"
          title="VueJS for the frontend framework"
          src="https://chriscorchado.com/images/vuejs.png"
        />
      </div>
      <div>
        <img
          alt="nodeJS Icon"
          title="nodeJS for the platform"
          src="https://chriscorchado.com/images/nodejs.png"
        />
      </div>
      <div>
        <img
          alt="Express Icon"
          title="Express for the backend framework"
          src="https://chriscorchado.com/images/express.png"
        />
      </div>
      <div>
        <img
          alt="mongoDB Icon"
          title="mongoDB for the database"
          src="https://chriscorchado.com/images/mongodb.png"
        />
      </div>
      <div>
        <img
          alt="mongoose Icon"
          title="mongoose to connect to the mongoDB database"
          src="https://chriscorchado.com/images/mongoose.png"
        />
      </div>

      <div>
        <img
          alt="TypeScript Icon"
          title="TypeScript for Javascript functionality"
          src="https://chriscorchado.com/images/typescript.png"
        />
      </div>
      <div>
        <img
          alt="SASS Icon"
          title="SASS for the CSS look and feel styles"
          src="https://chriscorchado.com/images/sass.png"
        />
      </div>
      <div>
        <img
          alt="Pug Icon"
          title="Pug for the HTML content templates"
          src="https://chriscorchado.com/images/pugjs.png"
        />
      </div>
      <div>
        <img
          alt="HTML5 Icon"
          title="HTML5 for overall structure"
          src="https://chriscorchado.com/images/html5.jpg"
        />
      </div>
      <div>
        <a href="https://github.com/chriscorchado125/VueJS" target="_blank">
          <img
            alt="Github Icon"
            title="View the code on Github"
            src="https://chriscorchado.com/images/github.jpg"
        /></a>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class SiteFooter extends Vue {}
</script>
