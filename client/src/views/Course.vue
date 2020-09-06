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

import SiteHeaderComponent from "@/components/SiteHeader.vue";
import CourseComponent from "@/components/Course.vue";
import SiteFooterComponent from "@/components/SiteFooter.vue";

@Component({
  components: {
    CourseComponent,
    SiteFooterComponent,
    SiteHeaderComponent
  }
})
export default class Course extends Vue {}
</script>
