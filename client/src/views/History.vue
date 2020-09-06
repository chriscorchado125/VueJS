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

import SiteHeaderComponent from "@/components/SiteHeader.vue";
import HistoryComponent from "@/components/History.vue";
import SiteFooterComponent from "@/components/SiteFooter.vue";

@Component({
  components: {
    HistoryComponent,
    SiteFooterComponent,
    SiteHeaderComponent
  }
})
export default class History extends Vue {}
</script>
