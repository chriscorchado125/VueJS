<template lang="pug">

    div#pagination(v-if="this.$store.state.pageNum > 1 || nextLinkValue()")

      a.pager-navigation(v-if="this.$store.state.pageNum > 1 && activateNav" @click="pageRecords('prev')" href="#" id="prevLink" title="View the previous page" role='button') Prev
      span.pager-navigation.disabled(v-else title="There is no previous page available" role='button') Prev

      a.pager-navigation(v-if="nextLinkValue() && activateNav" @click="pageRecords('next')" href="#" id="nextLink" title="View the next page" role='button') Next
      span.pager-navigation.disabled(v-else title="There is no next page available" role='button') Next

    if error
      p #{ error }

</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

import getCookie from "./../ts/getCookie";

@Component
export default class SitePagination extends Vue {
  currentPageNum = 1;
  direction = "";
  recordCount = getCookie("recordCount");
  //nextLink = getCookie("nextLink");
  activateNav = true;

  created() {
    this.$store.commit("setMaxItemsPerPage", getCookie("maxItemsPerPage"));
  }

  private pageRecords(dir) {
    this.direction = dir;
    this.activateNav = false;

    if (this.currentPageNum !== this.$store.state.pageNum) {
      this.currentPageNum = this.$store.state.pageNum;
    }

    if (dir == "next") this.currentPageNum++;
    if (dir == "prev") this.currentPageNum--;

    this.$store.commit("setPagingDirection", dir);
    this.$store.commit("setPageNum", this.currentPageNum);

    //this.$store.commit("setNextRecord", getCookie("nextLink"));
    //this.nextLink = this.$store.state.setNextRecord;
    this.recordCount = this.$store.state.pageRecordCount;
  }

  // TODO: fix next link.  If the record count is the max then there will be a next link which is not right
  // Each query needs to check for one more record to determine if there are more records
  private nextLinkValue() {
    return this.$store.state.pageRecordCount == this.$store.state.maxRecords;
  }

  @Watch("currentPageNum")
  async onPropertyChanged(value: string, oldValue: string) {
    let queryString = this.$route.path + "?page=" + value;
    if (this.direction) queryString += "&dir=" + this.direction;
    if (this.$store.state.search) queryString += "&q=" + this.$store.state.search;

    this.$router.push({ path: queryString }).catch((err) => {
      console.log(err);
    });

    this.activateNav = true;
  }
}
</script>

<style scoped lang="scss">
@import "./../scss/header/pagination.scss";
</style>
