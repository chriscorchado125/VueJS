<template>
  <span>
    <SiteHeaderComponent />
    <CourseComponent />
    <SiteFooterComponent />
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import SiteHeaderComponent from "@/components/layout/SiteHeader.vue";
import CourseComponent from "@/components/pages/Course.vue";
import SiteFooterComponent from "@/components/layout/SiteFooter.vue";

@Component({
  components: {
    SiteHeaderComponent,
    CourseComponent,
    SiteFooterComponent
  }
})
export default class Course extends Vue {}
</script>
