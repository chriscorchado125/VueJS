<template lang="pug">

  main.container(role="main" v-if="dataLoaded")

    div#noRecords(v-if="this.$store.state.pageRecordCount == 0 && this.$store.state.search")  No matches found for '{{this.$store.state.search}}'

    h1(v-else id='content' tabindex="12") Courses

    if error
      p #{ error }

    div.container.courses-container.row

      div.course-box.box(v-for="item in this.$store.state.pageRecords" :key="item._id")

        h2(v-html="highlightSearch(item.course.name, query)" :tabIndex="tabIndex")

        div
          img(loading=lazy :src="item.course.certificate_image" :alt="item.course.name" :title="item.course.name + ' certificate'" :tabIndex="tabIndex")

        div.course-wrapper

          span.course-date(:tabIndex="tabIndex") {{ getMonthYear(item.course.course_date) }}

          span.course-links

            a(:href="item.course.certificate_pdf" target='_blank' :tabIndex="tabIndex")
              img(loading=lazy src="https://chriscorchado.com/images/pdfIcon.jpg" height="25" title="View the PDF Certificate" alt="PDF Icon")

          span.course-links(v-if="item.course.track_image")

            a(:href="item.course.track_image" target='_blank' data-featherlight="image" :tabIndex="tabIndex")
                img(loading=lazy src="https://chriscorchado.com/images/linkedIn-track.png" height="25" title="View the Courses in the Track" alt="Trophy Icon")

</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import CourseService from "./../../services/CourseService";
import getMonthYear from "./../../ts/getMonthYear";
import getLightboxCode from "./../../ts/getLightboxCode";
import highlightSearch from "./../../ts/highlightSearch";

@Component
export default class Course extends Vue {
  data: Array<object> = [];
  dataLoaded = false;
  error = "";
  query = this.$store.state.search;
  tabCount = 20;

  async created() {
    try {
      this.data = await CourseService.getCourse();
      this.$store.commit("setRecords", this.data);
      this.dataLoaded = true;
      getLightboxCode();
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
    titleEl.textContent = "Chris Corchado - Courses - Portfolio and Resume";
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
@import "./../../scss/pages/course.scss";
</style>
