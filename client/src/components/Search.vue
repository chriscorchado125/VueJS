<template lang="pug">

  div#search-container(role="search")

    //span#searchCount(v-if="this.$store.state.pageRecordUserText") {{ this.$store.state.pageRecordUserText }}
    span#searchCount() Items 444-444

    label
      span.screen-reader Search
      input(type="text" id="searchSite" @keypress="debounceMe()" @keyup="searchFilter()" v-model="searchFor" class="ccBtn" title="Search" aria-label="Search" placeholder="Search items"  )
  
    label
      span.screen-reader Clear Search
      button(id="searchBtn" class="searchBtn" @click="clearSearch()"  aria-label="Clear Search" title="Clear search" role="button") clear

    <site-pagination />

    div(v-if="this.searchFor" style="color:red") Under Development

</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import debounce from "./../ts/debounce";
import SitePagination from "@/components/SitePagination.vue";

@Component({
  components: {
    SitePagination
  }
})
export default class Search extends Vue {
  searchFor: any = "";
  page = 0;
  count = 0;
  maxItemsPerPage = 0;
  //pathTo = "";

  created() {
    this.$store.commit("setSearchedFor", this.$route.query.q || "");
    this.searchFor = this.$route.query.q || "";
    this.page = +this.$route.query.page || 0;
    this.count = this.$store.state.pageRecordCount || 0;
    this.maxItemsPerPage = this.$store.state.maxRecordsPerPage;
  }

  mounted() {
    // TODO remove this code after adding reactivity
    // if searching put the cursor inside the search box
    if (this.searchFor) {
      const input = document.getElementById("searchSite") as HTMLInputElement;
      input.focus();
    }
  }

  searchFilter() {
    //this.searchFor = "TODO filter here";
    this.$store.commit("setSearchedFor", this.searchFor);
  }

  clearSearch() {
    this.searchFor = "";
    this.$store.commit("setSearchedFor", "");
    location.href = window.location.pathname;

    // this.$router.push({ path: this.pathTo }).catch((err) => {
    //   console.log(err);
    // });
  }

  debounceMe = debounce(() => {
    // TODO make reactive
    location.href = window.location.pathname + "?q=" + this.$store.state.search;
  }, 500);
}
</script>

<style scoped lang="scss">
@import "./../scss/search.scss";
</style>
