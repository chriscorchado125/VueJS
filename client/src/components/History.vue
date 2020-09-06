<template lang="pug">

  main.container(role="main")

    h1 History

    if error
      p #{ error }

    div.container.company

      div.company-container.col.shadow(v-for="item in data" :key="item._id")

        div.company-name {{ item.history.name }}

        div.company-job-title {{ item.history.job_title }}

        div.body-container(v-html="item.history.description")

        div.screenshot-container

          img(loading=lazy :src="item.history.screenshots" class="company-screenshot" :alt="item.history.name")

          div.employment-dates(v-if="item.history.end_date") {{ formatDate(item.history.start_date) }} -  {{ formatDate(item.history.end_date) }}

          div.employment-dates(v-else="item.history.end_date") {{ formatDate(item.history.start_date) }} -  null

</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
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
      this.$store.commit("setRecordCount", this.data.length);
      this.$store.commit("setUserRecordCount");
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
