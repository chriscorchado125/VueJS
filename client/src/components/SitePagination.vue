<template lang="pug">

    //div#pagination(v-if="(count >= maxItemsPerPage)")
    div#pagination(v-if="true")

      a.pager-navigation(v-if="page > 1" href="#" id="prevLink" title="View the previous page" role='button') Prev
      span.pager-navigation.disabled(v-else title="There is no previous page available" role='button') Prev

      a.pager-navigation(v-if="(count > maxItemsPerPage) && (page > 0)" href="#" id="nextLink" title="View the next page" role='button') Next
      span.pager-navigation.disabled(v-else title="There is no previous page available" role='button') Next

    if error
      p #{ error }
    
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class SitePagination extends Vue {
  error = "";
  page = 0;
  count = 0;
  maxItemsPerPage = 0;

  async created() {
    this.page = +this.$route.query.page || 0;
    this.count = +this.$store.state.pageRecordCount;
    this.maxItemsPerPage = this.$store.state.maxRecordsPerPage;
    try {
    } catch (err) {
      this.error = err.message;
    }
  }
}
</script>

<style scoped lang="scss">
@import "./../scss/pagination.scss";
</style>
