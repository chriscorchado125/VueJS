<template lang="pug">

  form#search-container(role="search" :class="containerStyle" method="get" accept-charset="UTF-8" onClick="return false")

    span#searchCount(v-if="this.$store.state.pageRecordUserText") {{ this.$store.state.pageRecordUserText }}

    label(for="searchSite")
      span.screen-reader Enter Search
      input(type="search" id="searchSite" @keypress="searchFilter()" v-model="searchFor" class="ccBtn" title="Search" aria-label="Enter search term" aria-required="true" maxlength="128" placeholder="Search items")

    label(for="searchSubmit")
      span.screen-reader Search
      button(type="submit" id="searchSubmit" class="searchBtn" @click="search()"  aria-label="Search" title="search" role="button") Search


    label(for="searchClear")
      span.screen-reader Clear Search
      button(type="reset" id="searchClear" class="searchBtn" @click="clearSearch()" aria-label="Clear Search" value="Clear" title="Clear search" role="button") Clear

    <site-pagination />

</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

import SitePagination from "@/components/SitePagination.vue";

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
      this.containerStyle = "paginationYes";
    } else {
      this.containerStyle = "paginationNo";
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

    this.$router.push({ path: this.$route.path }).catch((err) => {
      console.log(err);
    });
  }

  search() {
    this.searchFor = this.$store.state.search.replace(/[^A-Z ]/gi, "");
    this.$store.commit("setPageNum", 1);

    this.$router
      .push({ path: this.$route.path + "?q=" + this.searchFor })
      .catch((err) => {
        console.log(err);
      });
  }

  // search data
  @Watch("$route")
  async onPropertyChanged(value: any, oldValue: any) {
    // clear search when navigating between pages - name is the route
    if (value.name !== oldValue.name) {
      this.searchFor = "";
      this.$store.commit("setSearchedFor", "");
    }
  }
}
</script>

<style scoped lang="scss">
@import "./../scss/header/search.scss";
@import "./../scss/header/pagination.scss";
</style>
