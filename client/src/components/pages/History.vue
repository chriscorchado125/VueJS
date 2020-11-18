<template lang="pug">

  main.container(role="main" v-if="dataLoaded")

    div#noRecords(v-if="this.$store.state.pageRecordCount == 0 && this.$store.state.search")  No matches found for '{{this.$store.state.search}}'

    h1(v-else id='content') History

    if error
      p #{ error }

    div.container.company

      div.company-container.col.shadow(v-for="(item, index) in this.$store.state.pageRecords" :key="item._id")

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
import { Watch } from "vue-property-decorator";

import HistoryService from "./../../services/HistoryService";

import getMonthYear from "./../../ts/getMonthYear";
import highlightSearch from "./../../ts/highlightSearch";

@Component
export default class History extends Vue {
  data: Array<object> = [];
  dataLoaded = false;
  error = "";
  query = this.$store.state.search;

  async created() {
    try {
      this.data = await HistoryService.getHistory();
      this.$store.commit("setRecords", this.data);
      this.dataLoaded = true;
    } catch (err) {
      this.error = err.message;
    }
  }

  mounted() {
    const titleEl: any = document.querySelector("head title");
    titleEl.textContent = "Chris Corchado - Work History";
  }

  // needed for the highlight search to work
  beforeUpdate() {
    this.query = this.$route.query.q;
  }

  getMonthYear = getMonthYear;

  highlightSearch = highlightSearch;

  @Watch("$route")
  async onPropertyChanged(value: any, oldValue: any) {
    this.data = await HistoryService.getHistory(
      value.query.page,
      this.$route.query.dir,
      this.$store.state.search
    );
    this.$store.commit("setRecords", this.data);
  }
}
</script>

<style scoped lang="scss">
@import "./../../scss/pages/company.scss";
</style>
