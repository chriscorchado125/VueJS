<template>
    <CourseComponent />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CourseComponent from "@/components/pages/Course.vue";

@Component({
  components: {
    CourseComponent
  }
})
export default class Course extends Vue {}
</script>
