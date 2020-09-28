<template>
  <span>
    <SiteHeaderComponent />
    <ContactComponent />
    <SiteFooterComponent />
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import SiteHeaderComponent from "@/components/layout/SiteHeader.vue";
import ContactComponent from "@/components/pages/Contact.vue";
import SiteFooterComponent from "@/components/layout/SiteFooter.vue";

@Component({
  components: {
    SiteHeaderComponent,
    ContactComponent,
    SiteFooterComponent
  }
})
export default class Contact extends Vue {}
</script>
