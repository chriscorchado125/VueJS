<template lang="pug">

  div#search-container(role="search" :class="containerStyle")

    - let counter = 6

    span#searchCount(v-if="this.$store.state.pageRecordUserText" tabindex=counter++) {{ this.$store.state.pageRecordUserText }}

    label
      span.screen-reader Search
      input(type="text" id="searchSite" @keypress="debounceMe()" @keyup="searchFilter()" v-model="searchFor" class="ccBtn" title="Search" aria-label="Search" placeholder="Search items" tabindex=counter++)

    label
      span.screen-reader Clear Search
      button(id="searchBtn" class="searchBtn" @click="clearSearch()"  aria-label="Clear Search" title="Clear search" role="button" tabindex=counter++) clear

    <site-pagination />

</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import debounce from "./../ts/debounce";
import SitePagination from "@/components/SitePagination.vue";

import HistoryService from "./../services/HistoryService";
import CourseService from "./../services/CourseService";
import ProjectService from "./../services/ProjectService";

@Component({
  components: {
    SitePagination
  }
})
export default class Search extends Vue {
  searchFor: any = "";
  containerStyle = "paginationNo";

  mounted() {
    this.setContainerStyle();
  }

  updated() {
    this.setContainerStyle();
  }

  setContainerStyle() {
    if (
      this.$store.state.pageRecordCount == this.$store.state.maxRecords ||
      this.$store.state.pageNum > 1
    ) {
      this.containerStyle = "paginationNo";
    } else {
      this.containerStyle = "paginationYes";
    }
  }

  searchFilter() {
    this.searchFor = this.searchFor.replace(/[^A-Z ]/gi, "");
    this.$store.commit("setSearchedFor", this.searchFor);
  }

  clearSearch() {
    this.searchFor = "";
    this.$store.commit("setSearchedFor", "");
    this.$store.commit("setPageNum", 1);

    this.$router.push({ path: window.location.pathname }).catch((err) => {
      console.log(err);
    });
  }

  debounceMe = debounce(() => {
    this.searchFor = this.$store.state.search.replace(/[^A-Z ]/gi, "");
    this.$store.commit("setPageNum", 1);

    this.$router
      .push({ path: window.location.pathname + "?q=" + this.searchFor })
      .catch((err) => {
        console.log(err);
      });
  }, 500);

  // search data
  @Watch("$route")
  async onPropertyChanged(value: any, oldValue: any) {
    let pageData = "";

    switch (this.$route.name) {
      case "Courses":
        pageData = await CourseService.getCourse(
          this.$route.query.page,
          this.$route.query.dir,
          this.$store.state.search
        );
        break;
      case "History":
        pageData = await HistoryService.getHistory(
          this.$route.query.page,
          this.$route.query.dir,
          this.$store.state.search
        );
        break;
      case "Projects":
        pageData = await ProjectService.getProject(
          this.$route.query.page,
          this.$route.query.dir,
          this.$store.state.search
        );
        break;
    }

    this.$store.commit("setRecords", pageData);
  }
}
</script>

<style scoped lang="scss">
@import "./../scss/header/search.scss";
</style>
