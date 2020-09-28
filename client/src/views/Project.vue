<template>
  <span>
    <SiteHeaderComponent />
    <ProjectComponent />
    <SiteFooterComponent />
  </span>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import SiteHeaderComponent from "@/components/layout/SiteHeader.vue";
import ProjectComponent from "@/components/pages/Project.vue";
import SiteFooterComponent from "@/components/layout/SiteFooter.vue";

@Component({
  components: {
    SiteHeaderComponent,
    ProjectComponent,
    SiteFooterComponent
  }
})
export default class Course extends Vue {}
</script>
