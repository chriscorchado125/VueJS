<template lang="pug">

  main.container(role="main" v-if="dataLoaded && hasRecords")

    h1(id='content') Work History

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

          div.employment-dates(v-else="item.history.end_date") {{ getMonthYear(item.history.start_date) }}

</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

import HistoryService from "./../../services/HistoryService";

import getMonthYear from "./../../ts/getMonthYear";
import highlightSearch from "./../../ts/highlightSearch";
import noRecordsFound from "./../../ts/noRecords";
import animateLogo from "./../../ts/animateLogo";

@Component
export default class History extends Vue {
  data = [];
  dataLoaded = false;
  error = "";
  query = this.$store.state.search;
  hasRecords = true;

  async created(): Promise<void> {
    try {
      this.data = await HistoryService.getHistory();
      this.$store.commit("setRecords", this.data);
      this.dataLoaded = true;
      animateLogo('logo-image', '');
    } catch (err) {
      this.error = err.message;
    }
  }

  mounted(): void {
    animateLogo('logo-image', 'spin');

    const titleEl = document.querySelector("head title");
    if (titleEl) {
      titleEl.textContent = "Work History | Chris Corchado";
    }
  }

  updated(): void{
    if (this.data.length == 0) {
      noRecordsFound('no-records', this.$store.state.search, 'navigation', 'No matches found for')
    } else {
      noRecordsFound('no-records', '', 'navigation', 'No matches found for')
    }
  }

  // needed for the highlight search to work
  beforeUpdate(): void {
    this.query = this.$route.query.q;
  }

  getMonthYear = getMonthYear;

  highlightSearch = highlightSearch;

  @Watch("$route")
  async onPropertyChanged(value: unknown): Promise<void> {
    this.data = await HistoryService.getHistory(
      // @ts-ignore
      value.query.page,
      this.$route.query.dir,
      this.$store.state.search
    );

    this.$store.commit("setRecords", this.data);
  }
}
</script>

<style lang="scss">
@import "./../../scss/pages/company.scss";
@import "./../../scss/header/search.scss";
</style>
