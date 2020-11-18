<template lang="pug">

  main.container(role="main" v-if="dataLoaded")

    div#noRecords(v-if="this.$store.state.pageRecordCount == 0 && this.$store.state.search")  No matches found for '{{this.$store.state.search}}'

    h1(v-else id='content') Courses

    if error
      p #{ error }

    div.container.courses-container.row

      div.course-box.box(v-for="item in this.$store.state.pageRecords" :key="item._id")

        h2(v-html="highlightSearch(item.course.name, query)")

        div
          img(loading=lazy :src="item.course.certificate_image" :alt="item.course.name" :title="item.course.name + ' certificate'")

        div.course-wrapper

          span.course-date {{ getMonthYear(item.course.course_date) }}

          span.course-links

            a(:href="item.course.certificate_pdf" target='_blank' rel="noopener" title="Opens in a new window")
              img(loading=lazy src="https://chriscorchado.com/images/pdfIcon.jpg" height="25" title="View the PDF Certificate" alt="PDF Icon")

          span.course-links(v-if="item.course.track_image")

            a(:href="item.course.track_image" target='_blank' data-featherlight="image" rel="noopener" title="Opens in a new window")
                img(loading=lazy src="https://chriscorchado.com/images/linkedIn-track.png" height="25" title="View the Courses in the Track" alt="Trophy Icon")

</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

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

  @Watch("$route")
  async onPropertyChanged(value: any, oldValue: any) {
    this.data = await CourseService.getCourse(
      value.query.page,
      this.$route.query.dir,
      this.$store.state.search
    );
    this.$store.commit("setRecords", this.data);
  }
}
</script>

<style scoped lang="scss">
@import "./../../scss/pages/course.scss";
</style>
