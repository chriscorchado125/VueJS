<template lang="pug">

  main.container(role="main" v-if="dataLoaded")

    div#contact.container.contact-form

      h1(id='content')  Contact Me

      if error
        p #{ error }

      span(v-html="formHTML")

</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import ContactService from "./../../services/ContactService";
import animateLogo from "./../../ts/animateLogo";

@Component
export default class Contact extends Vue {
  data = [];
  dataLoaded = false;
  error = "";
  formHTML = "";

  async created(): Promise<void> {
    try {
      this.data = await ContactService.getContact();
      this.$store.commit("setRecords", this.data);
      // @ts-ignore
      this.formHTML = this.getForm(this.data.data);
      this.dataLoaded = true;
      animateLogo('logo-image', '');
    } catch (err) {
      this.error = err.message;
    }
  }

  mounted(): void {
    animateLogo('logo-image', 'spin');

    const titleEl = document.querySelector("head title");
    if (titleEl) {
      titleEl.textContent = "Contact Me | Chris Corchado";
    }
  }

  updated(): void {
    const emailField = document.getElementById("edit-mail");
    if (emailField) {
      emailField.focus();
    }
  }

  getForm(data: unknown): string {
    // @ts-ignore
    let form = data.substr(
      // @ts-ignore
      data.indexOf("<form class="),
      // @ts-ignore
      data.indexOf("</form>")
    );
    form = form.substr(0, form.indexOf("</form>") + 8);
    form = form.replace("Your email address", "Email");

    // get the contact form JavaScript
    const scriptString =
      '<script type="application/json" data-drupal-selector="drupal-settings-json">';

    // @ts-ignore
    let script = data.substr(
      // @ts-ignore
      data.indexOf(scriptString),
      // @ts-ignore
      data.indexOf("><\/script>")
    );
    script = script.substr(0, script.indexOf("<\/script>") + 9);

    return `${form} ${script}`;
  }
}
</script>

<style lang="scss">
@import "./../../scss/pages/contact.scss";
</style>
