<template>
  <HomeComponent />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HomeComponent from "@/components/pages/Home.vue";

@Component({
  components: {
    HomeComponent,
  },
})
export default class Home extends Vue {}
</script>
