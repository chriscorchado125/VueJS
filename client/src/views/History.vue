<template>
  <span>
    <SiteHeaderComponent />
    <HistoryComponent />
    <SiteFooterComponent />
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import SiteHeaderComponent from "@/components/layout/SiteHeader.vue";
import HistoryComponent from "@/components/pages/History.vue";
import SiteFooterComponent from "@/components/layout/SiteFooter.vue";

@Component({
  components: {
    SiteHeaderComponent,
    HistoryComponent,
    SiteFooterComponent
  }
})
export default class History extends Vue {}
</script>
