<template lang="pug">

  main.container(role="main")

    div#noRecords(v-if="this.$store.state.pageRecordCount == 0 && this.$store.state.search")  No matches found for '{{this.$store.state.search}}'

    h1(v-else) History

    if error
      p #{ error }

    div.container.company

      div.company-container.col.shadow(v-for="item in this.$store.state.pageRecords" :key="item._id")

        div.company-name(v-html="highlightSearch(item.history.name, query)")

        div.company-job-title(v-html="highlightSearch(item.history.job_title, query)")

        div.body-container(v-html="highlightSearch(item.history.description, query)")

        div.screenshot-container

          img(loading=lazy :src="item.history.screenshots" class="company-screenshot" :alt="item.history.name")

          div.employment-dates(v-if="item.history.end_date") {{ getMonthYear(item.history.start_date) }} -  {{ getMonthYear(item.history.end_date) }}

          div.employment-dates(v-else="item.history.end_date") {{ getMonthYear(item.history.start_date) }} -  null

</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import HistoryService from "./../../services/HistoryService";
import getMonthYear from "./../../ts/getMonthYear";
import highlightSearch from "./../../ts/highlightSearch";

@Component
export default class History extends Vue {
  data: Array<object> = [];
  error = "";
  query = this.$route.query.q || "";

  async created() {
    try {
      this.data = await HistoryService.getHistory(this.query);
      this.$store.commit("setRecords", this.data);
    } catch (err) {
      this.error = err.message;
    }

    const titleEl = document.querySelector("head title");
    titleEl.textContent = "Chris Corchado - History - Portfolio and Resume";
  }

  getMonthYear = getMonthYear;

  highlightSearch = highlightSearch;
}
</script>

<style scoped lang="scss">
@import "./../../scss/pages/company.scss";
</style>
