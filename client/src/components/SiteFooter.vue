<template>
  <footer id="footer">
    <div
      class="site-version"
      id="html"
      aria-label="Icons of the technology used on this site and link to Github"
    >
      <div>
        <img
          alt="HTML5 Icon"
          title="This site uses HTML5"
          src="https://chriscorchado.com/images/html5.jpg"
        />
      </div>
      <div>
        <img
          alt="SASS Icon"
          title="This site uses SASS"
          src="https://chriscorchado.com/images/sass.png"
        />
      </div>
      <div>
        <img
          alt="TypeScript Icon"
          title="This site uses TypeScript"
          src="https://chriscorchado.com/images/typescript.png"
        />
      </div>
      <div>
        <img
          alt="Vue js Icon"
          title="This site uses Vue js"
          src="https://chriscorchado.com/images/vuejs.png"
        />
      </div>
      <div>
        <img
          alt="nodeJS Icon"
          title="This site uses nodeJS"
          src="https://chriscorchado.com/images/nodejs.png"
        />
      </div>
      <div>
        <img
          alt="Express Icon"
          title="This site uses Express"
          src="https://chriscorchado.com/images/express.png"
        />
      </div>
      <div>
        <img
          alt="mongoDB Icon"
          title="This site uses mongoDB"
          src="https://chriscorchado.com/images/mongodb.png"
        />
      </div>
      <div>
        <img
          alt="mongoose Icon"
          title="This site uses mongoose"
          src="https://chriscorchado.com/images/mongoose.png"
        />
      </div>
      <div>
        <a href="https://github.com/chriscorchado125/Vue" target="_blank">
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
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SiteFooter extends Vue {}
</script>
