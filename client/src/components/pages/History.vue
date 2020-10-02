<template lang="pug">

  main.container(role="main")

    div#noRecords(v-if="this.$store.state.pageRecordCount == 0 && this.$store.state.search")  No matches found for '{{this.$store.state.search}}'

    h1(v-else id='content' tabindex="12") History

    if error
      p #{ error }

    div.container.company

      div.company-container.col.shadow(v-for="(item, index) in this.$store.state.pageRecords" :key="item._id")

        div.company-name(v-html="highlightSearch(item.history.name, query)" :tabIndex="tabIndex")

        div.company-job-title(v-html="highlightSearch(item.history.job_title, query)" :tabIndex="tabIndex")

        div.body-container(v-html="highlightSearch(item.history.description, query)" :tabIndex="tabIndex")

        div.screenshot-container

          img(loading=lazy :src="item.history.screenshots" class="company-screenshot" :alt="item.history.name" :tabIndex="tabIndex")

          div.employment-dates(v-if="item.history.end_date" :tabIndex="tabIndex") {{ getMonthYear(item.history.start_date) }} -  {{ getMonthYear(item.history.end_date) }}

          div.employment-dates(v-else="item.history.end_date" :tabIndex="tabIndex") {{ getMonthYear(item.history.start_date) }} -  null

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
  query = this.$store.state.search;
  tabCount = 20;

  async created() {
    try {
      this.data = await HistoryService.getHistory();
      this.$store.commit("setRecords", this.data);
    } catch (err) {
      this.error = err.message;
    }
  }

  get tabIndex() {
    this.tabCount++;
    return this.tabCount;
  }

  mounted() {
    const titleEl: any = document.querySelector("head title");
    titleEl.textContent = "Chris Corchado - History - Portfolio and Resume";
  }

  // needed for the highlight search to work
  beforeUpdate() {
    this.query = this.$route.query.q;
  }

  getMonthYear = getMonthYear;

  highlightSearch = highlightSearch;
}
</script>

<style scoped lang="scss">
@import "./../../scss/pages/company.scss";
</style>
