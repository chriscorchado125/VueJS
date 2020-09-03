<template>
  <span>
    <SiteHeaderComponent />
    <HistoryComponent />
    <SiteFooterComponent />
  </span>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

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
