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

import SiteHeaderComponent from "@/components/SiteHeader.vue";
import HomeComponent from "@/components/Home.vue";
import SiteFooterComponent from "@/components/SiteFooter.vue";

@Component({
  components: {
    SiteHeaderComponent,
    HomeComponent,
    SiteFooterComponent
  }
})
export default class Home extends Vue {}
</script>
