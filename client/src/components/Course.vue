<template lang="pug">

  main.container(role="main")

    h1 Courses
    
    if error
      p #{ error }

    div.container.courses-container.row

      div.course-box.box(v-for="items in data" :key="items._id")
       
        h2 {{ items.course.name }}

        div        
          img(loading=lazy :src="items.course.certificate_image" :alt="cleanName(items.course.name)" :title="cleanName(items.course.name) + ' certificate'")

        div.course-wrapper

          span.course-date {{ getMonthYear(items.course.course_date) }}

          span.course-links

            a(:href="items.course.certificate_pdf" target='_blank')
              img(loading=lazy src="https://chriscorchado.com/images/pdfIcon.jpg" height="25" title="View the PDF Certificate" alt="PDF Icon")
            
          span.course-links(v-if="items.course.track_image")
            
            a(:href="items.course.track_image" target='_blank' data-featherlight="image")
                img(loading=lazy src="https://chriscorchado.com/images/linkedIn-track.png" height="25" title="View the Courses in the Track" alt="Trophy Icon")

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CourseService from "./../services/CourseService";
import getMonthYear from "./../ts/getMonthYear";
import getLightboxCode from "./../ts/getLightboxCode";

const params = new URLSearchParams(window.location.search);

@Component
export default class Course extends Vue {
  data = [];
  error = "";

  async created() {
    try {
      this.data = await CourseService.getCourse(params.get("q"));
      getLightboxCode();
    } catch (err) {
      this.error = err.message;
    }
  }

  cleanName(val) {
    return val.replace(/(<([^>]+)>)/gi, "");
  }

  getMonthYear = getMonthYear;
}
</script>

<style scoped lang="scss">
@import "./../scss/course.scss";
@import "//cdn.jsdelivr.net/npm/featherlight@1.7.14/release/featherlight.min.css";
@import "//cdn.jsdelivr.net/npm/featherlight@1.7.14/release/featherlight.gallery.min.css";
</style>
