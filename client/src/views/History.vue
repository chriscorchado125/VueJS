<template>
    <HistoryComponent />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HistoryComponent from "@/components/pages/History.vue";

@Component({
  components: {
    HistoryComponent
  }
})
export default class History extends Vue {}
</script>
