<template lang="pug">

  main.container(role="main")

    div#noRecords(v-if="this.data.length == 0 && this.$store.state.search")  No matches found for '{{this.$store.state.search}}'

    h1(v-else) History

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

@Component
export default class History extends Vue {
  data = [];
  error = "";

  async created() {
    try {
      this.data = await HistoryService.getHistory(this.$route.query.q);
      this.$store.commit("setRecords", this.data);
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
