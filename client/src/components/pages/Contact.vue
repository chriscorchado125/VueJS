<template lang="pug">

  main.container(role="main" v-if="dataLoaded")

    div#contact.container.contact-form

      h1(id='content' tabindex="12")  Contact

      if error
        p #{ error }

      span(v-html="formHTML")

</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import ContactService from "./../../services/ContactService";

@Component
export default class Contact extends Vue {
  data: any = [];
  dataLoaded = false;
  error = "";
  formHTML = "";

  async created() {
    try {
      this.data = await ContactService.getContact();
      this.$store.commit("setRecords", this.data);
      this.formHTML = this.getForm(this.data.data);
      this.dataLoaded = true;
    } catch (err) {
      this.error = err.message;
    }
  }

  mounted() {
    const titleEl: any = document.querySelector("head title");
    titleEl.textContent = "Chris Corchado - Contact Me - Portfolio and Resume";
  }

  updated() {
    const emailField: any = document.getElementById("edit-mail");
    emailField.focus();
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

    return `${form} ${script}`;
  }
}
</script>

<style lang="scss">
@import "./../../scss/pages/contact.scss";
</style>
