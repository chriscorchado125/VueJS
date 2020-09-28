<template>
  <span>
    <SiteHeaderComponent />
    <HomeComponent />
    <SiteFooterComponent />
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import SiteHeaderComponent from "@/components/layout/SiteHeader.vue";
import HomeComponent from "@/components/pages/Home.vue";
import SiteFooterComponent from "@/components/layout/SiteFooter.vue";

@Component({
  components: {
    SiteHeaderComponent,
    HomeComponent,
    SiteFooterComponent
  }
})
export default class Home extends Vue {}
</script>
