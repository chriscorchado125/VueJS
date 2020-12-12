<template lang="pug">

  form#search-container(role="search" :class="containerStyle" method="get" accept-charset="UTF-8" onClick="return false")

    span#search-count(aria-live="polite" v-if="this.$store.state.pageRecordUserText") {{ this.$store.state.pageRecordUserText }}

    label(for="search-site")
      span.screen-reader "Enter Search Term"
      input(@keypress="searchFilter()" v-model="searchFor" @focus="$event.target.select()" type="search" id="search-site" name="search_api" aria-label="Enter search term" aria-required="true"
          placeholder="Search items" maxlength="128" class="cc-btn search-btn")

    label(for="search-submit")
      span.screen-reader "Search"
      button(@click="search()" type="submit" id="search-submit" aria-label="Search" class="search-btn" value="Search" role="button") Search

    label(for="search-clear-btn")
      span.screen-reader "Clear Search"
      button(@click="clearSearch()" type="reset" id="search-clear-btn" aria-label="Clear Search" class="search-btn" title="Clear search" value="Clear" role="button") Clear

    <site-pagination />

</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

import SitePagination from "@/components/SitePagination.vue";

@Component({
  components: {
    SitePagination,
  },
})
export default class Search extends Vue {
  searchFor = "";
  containerStyle = "pagination-no";

  mounted(): void {
    this.setContainerStyle();
  }

  updated(): void {
    this.setContainerStyle();
  }

  setContainerStyle(): void {
    if (
      this.$store.state.pageRecordCount == this.$store.state.maxRecords ||
      this.$store.state.pageNum > 1
    ) {
      this.containerStyle = "pagination-yes";
    } else {
      this.containerStyle = "pagination-no";
    }
  }

  searchFilter(): void {
    this.searchFor = this.searchFor.replace(/[^A-Z ]/gi, "");
    this.$store.commit("setSearchedFor", this.searchFor);
  }

  clearSearch(): void {
    this.searchFor = "";
    this.$store.commit("setSearchedFor", "");
    this.$store.commit("setPageNum", 1);

    this.$router.push({ path: this.$route.path }).catch((err) => {
      console.log(err);
    });
  }

  search(): void {
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
  async onPropertyChanged(
    value: Record<string, unknown>,
    oldValue: Record<string, unknown>
  ): Promise<void> {
    // clear search when navigating between pages - name is the route
    if (value.name !== oldValue.name) {
      this.searchFor = "";
      this.$store.commit("setSearchedFor", "");
    }
  }
}
</script>

<style scoped lang="scss">
@import "./../../src/scss/header/search.scss";
@import "./../../src/scss/header/pagination.scss";
</style>
