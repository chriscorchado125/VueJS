<template lang="pug">

    div#pagination(v-if="this.$store.state.pageNum > 1 || nextLinkValue()")

      a.pager-navigation(v-if="this.$store.state.pageNum > 1 && activateNav" @click="pageRecords('prev')" href="#" id="prevLink" title="View the previous page" role='button' tabindex='9') Prev
      span.pager-navigation.disabled(v-else title="There is no previous page available" role='button') Prev

      a.pager-navigation(v-if="nextLinkValue() && activateNav" @click="pageRecords('next')" href="#" id="nextLink" title="View the next page" role='button' tabindex='10') Next
      span.pager-navigation.disabled(v-else title="There is no next page available" role='button') Next

    if error
      p #{ error }
    
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

import HistoryService from "./../services/HistoryService";
import CourseService from "./../services/CourseService";
import ProjectService from "./../services/ProjectService";

@Component
export default class SitePagination extends Vue {
  currentPageNum = 1;
  direction = "";
  recordCount = SitePagination.getCookie("recordCount");
  //nextLink = SitePagination.getCookie("nextLink");
  activateNav = true;

  created() {
    this.$store.commit("setMaxItemsPerPage", SitePagination.getCookie("maxItemsPerPage"));
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

    //this.$store.commit("setNextRecord", SitePagination.getCookie("nextLink"));
    //this.nextLink = this.$store.state.setNextRecord;
    this.recordCount = this.$store.state.pageRecordCount;
  }

  static getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  // TODO: fix next link.  If the record count is the max then there will be a next link which is not right
  // Each query needs to check for one more record to determine if there are more records
  private nextLinkValue() {
    return this.$store.state.pageRecordCount == this.$store.state.maxRecords;
  }

  @Watch("currentPageNum")
  async onPropertyChanged(value: string, oldValue: string) {
    let queryString = location.pathname + "?page=" + value;
    if (this.direction) queryString += "&dir=" + this.direction;
    if (this.$route.query.q) queryString += "&q=" + this.$route.query.q;

    this.$router.push({ path: queryString }).catch((err) => {
      console.log(err);
    });

    let pageData = "";

    switch (this.$route.name) {
      case "Courses":
        pageData = await CourseService.getCourse(
          value,
          this.direction,
          this.$route.query.q
        );
        break;
      case "History":
        pageData = await HistoryService.getHistory(
          value,
          this.direction,
          this.$route.query.q
        );
        break;
      case "Projects":
        pageData = await ProjectService.getProject(
          value,
          this.direction,
          this.$route.query.q
        );
        break;
    }

    this.$store.commit("setRecords", pageData);
    this.activateNav = true;
  }
}
</script>

<style scoped lang="scss">
@import "./../scss/header/pagination.scss";
</style>
