<template lang="pug">

  main.container(role="main")

    h1 History

    if error
      p #{ error }

    div.container.company

      div.company-container.col.shadow(v-for="items in data" :key="items._id")

        div.company-name {{ items.history.name }}

        div.company-job-title {{ items.history.job_title }}

        div.body-container(v-html="items.history.description")

        div.screenshot-container

          img(loading=lazy :src="items.history.screenshots" class="company-screenshot" :alt="items.history.name")

          div.employment-dates(v-if="items.history.end_date") {{ formatDate(items.history.start_date) }} -  {{ formatDate(items.history.end_date) }}

          div.employment-dates(v-else="items.history.end_date") {{ formatDate(items.history.start_date) }} -  null

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HistoryService from "./../services/HistoryService";
import getMonthYear from "./../ts/getMonthYear";

const params = new URLSearchParams(window.location.search);

@Component
export default class History extends Vue {
  data = [];
  error = "";

  async created() {
    try {
      this.data = await HistoryService.getHistory(params.get("q"));
    } catch (err) {
      this.error = err.message;
    }
  }

  formatDate = getMonthYear;
}
</script>

<style scoped lang="scss">
@import "./../scss/company.scss";
</style>
