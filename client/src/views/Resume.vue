<template>
    <ResumeComponent />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ResumeComponent from "@/components/pages/Resume.vue";

@Component({
  components: {
    ResumeComponent
  }
})
export default class Resume extends Vue {}
</script>
