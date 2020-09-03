<template lang="pug">

  main.container(role="main")

    div#contact.container.contact-form
      h1 Contact

      if error
        p #{ error }
   
      span(v-html="getForm(data.data)")

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ContactService from "./../services/ContactService";

@Component
export default class Contact extends Vue {
  data = [];
  error = "";

  async created() {
    try {
      this.data = await ContactService.getContact();
    } catch (err) {
      this.error = err.message;
    }
  }

  getForm(data) {
    let form = data.substr(data.indexOf("<form"), data.indexOf("</form>"));
    form = form.substr(0, form.indexOf("</form>") + 8);
    form = form.replace("Your email address", "Email");

    // get the contact form JavaScript
    const scriptString =
      '<script type="application/json" data-drupal-selector="drupal-settings-json">';
    let script = data.substr(data.indexOf(scriptString), data.indexOf("><\/script>"));
    script = script.substr(0, script.indexOf("<\/script>") + 9);
    console.log(script);
    return `${form} ${script}`;
  }
}
</script>

<style lang="scss">
@import "./../scss/contact.scss";
</style>
