<template>
  <span>
    <SiteHeaderComponent />
    <ContactComponent />
    <SiteFooterComponent />
  </span>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import SiteHeaderComponent from "@/components/SiteHeader.vue";
import ContactComponent from "@/components/Contact.vue";
import SiteFooterComponent from "@/components/SiteFooter.vue";

@Component({
  components: {
    ContactComponent,
    SiteFooterComponent,
    SiteHeaderComponent
  }
})
export default class Contact extends Vue {}
</script>
