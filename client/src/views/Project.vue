<template>
  <ProjectComponent />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ProjectComponent from "@/components/pages/Project.vue";

@Component({
  components: {
    ProjectComponent,
  },
})
export default class Course extends Vue {}
</script>
