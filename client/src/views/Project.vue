<template>
  <span>
    <SiteHeaderComponent />
    <ProjectComponent />
    <SiteFooterComponent />
  </span>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import SiteHeaderComponent from "@/components/SiteHeader.vue";
import ProjectComponent from "@/components/Project.vue";
import SiteFooterComponent from "@/components/SiteFooter.vue";

@Component({
  components: {
    ProjectComponent,
    SiteFooterComponent,
    SiteHeaderComponent
  }
})
export default class Course extends Vue {}
</script>
