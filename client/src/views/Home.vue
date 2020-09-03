<template>
  <span>
    <SiteHeaderComponent />
    <HomeComponent />
    <SiteFooterComponent />
  </span>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import SiteHeaderComponent from "@/components/SiteHeader.vue";
import HomeComponent from "@/components/Home.vue";
import SiteFooterComponent from "@/components/SiteFooter.vue";

@Component({
  components: {
    HomeComponent,
    SiteFooterComponent,
    SiteHeaderComponent
  }
})
export default class Home extends Vue {}
</script>
