<template lang="pug">

  main.container(role="main")

    h1 Courses
    
    if error
      p #{ error }

    div.container.courses-container.row

      div.course-box.box(v-for="item in data" :key="item._id")
       
        h2 {{ item.course.name }}
    
        div        
          img(loading=lazy :src="item.course.certificate_image" :alt="cleanName(item.course.name)" :title="cleanName(item.course.name) + ' certificate'")

        div.course-wrapper

          span.course-date {{ getMonthYear(item.course.course_date) }}

          span.course-links

            a(:href="item.course.certificate_pdf" target='_blank')
              img(loading=lazy src="https://chriscorchado.com/images/pdfIcon.jpg" height="25" title="View the PDF Certificate" alt="PDF Icon")
            
          span.course-links(v-if="item.course.track_image")
            
            a(:href="item.course.track_image" target='_blank' data-featherlight="image")
                img(loading=lazy src="https://chriscorchado.com/images/linkedIn-track.png" height="25" title="View the Courses in the Track" alt="Trophy Icon")

</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import CourseService from "./../services/CourseService";
import getMonthYear from "./../ts/getMonthYear";
import getLightboxCode from "./../ts/getLightboxCode";
import getCleanValue from "./../ts/getCleanValue";

const params = new URLSearchParams(window.location.search);

@Component
export default class Course extends Vue {
  data = [];
  error = "";

  async created() {
    try {
      this.data = await CourseService.getCourse(params.get("q"));
      this.$store.commit("setRecords", this.data);
      this.$store.commit("setRecordCount", this.data.length);
      this.$store.commit("setUserRecordCount");
      getLightboxCode();
    } catch (err) {
      this.error = err.message;
    }
  }

  cleanName = getCleanValue;

  getMonthYear = getMonthYear;
}
</script>

<style scoped lang="scss">
@import "./../scss/course.scss";
@import "//cdn.jsdelivr.net/npm/featherlight@1.7.14/release/featherlight.min.css";
@import "//cdn.jsdelivr.net/npm/featherlight@1.7.14/release/featherlight.gallery.min.css";
</style>
