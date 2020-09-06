<template lang="pug">
  main.container(role="main")

    h1 Projects 
    
    if error
      p #{ error }

    div.project-container.row

      div.project.col(v-for="item in data" :key="item._id")

        div.project-title {{ item.project.name }}

        div.project-company {{ item.project.company_name }} #[span.project-date {{ getMonthYear(item.project.project_date, 'yearOnly') }}]

        div.body-container(v-html="item.project.description")

        section(:class="setScreenshotClass(item.project.screenshots.length)" data-featherlight-gallery="" data-featherlight-filter="a" )

          div.project-item.shadow(v-for="screenshot in item.project.screenshots" :key="screenshot._id" :title="setScreenshots(screenshot)[0]")
            
            a.gallery(:href="setScreenshots(screenshot)[1]")

              div.project-item-desc {{ setScreenshots(screenshot)[0] }}

              img(loading="lazy" :src="setScreenshots(screenshot)[1]" :alt="setScreenshots(screenshot)[0]")

        span(v-if="item.project.videos !== ''" title="Play Video") 

          a.play-video(:href="encodeVideoName(item.project.videos, item.project.name)" target="_blank") Play Video

            img(loading="lazy" src="https://chriscorchado.com/images/play_video_new_window_icon.png" alt="Play Video Icon" width="20")

        div.project-technology {{ item.project.technology }}
        
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ProjectService from "./../services/ProjectService";
import getMonthYear from "./../ts/getMonthYear";
import getLightboxCode from "./../ts/getLightboxCode";

const params = new URLSearchParams(window.location.search);

@Component
export default class Project extends Vue {
  data = [];
  error = "";

  async created() {
    try {
      this.data = await ProjectService.getProject(params.get("q"));
      this.$store.commit("setRecordCount", this.data.length);
      this.$store.commit("setUserRecordCount");
      getLightboxCode();
    } catch (err) {
      this.error = err.message;
    }
  }

  setScreenshots(item) {
    return item.split(",");
  }

  setScreenshotClass(itemCount) {
    return "project-item-grid project-items" + itemCount;
  }

  encodeVideoName(urlParam, fileName) {
    return `https://chriscorchado.com/video.html?url=${urlParam}&name=${encodeURIComponent(
      fileName
    )}`;
  }

  getMonthYear = getMonthYear;
}
</script>

<style scoped lang="scss">
@import "./../scss/project.scss";
</style>
