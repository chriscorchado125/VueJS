<template lang="pug">
  main.container(role="main")

    div#noRecords(v-if="this.data.length == 0 && this.$store.state.search")  No matches found for '{{ query }}'

    h1(v-else) Projects 
    
    if error
      p #{ error }

    div.project-container

      div.project.col(v-for="item in data" :key="item._id")

        div.project-title(v-html="highlightSearch(item.project.name, query)")

        div.project-company(v-html="highlightSearch(item.project.company_name, query)") #[span.project-date {{ getMonthYear(item.project.project_date, 'yearOnly') }}]

        div.body-container(v-html="highlightSearch(item.project.description, query)")

        section(:class="setScreenshotClass(item.project.screenshots.length)" data-featherlight-gallery="" data-featherlight-filter="a" )

          div.project-item.shadow(v-for="screenshot in item.project.screenshots" :key="screenshot._id" :title="setScreenshots(screenshot)[0]")
            
            a.gallery(:href="setScreenshots(screenshot)[1]")

              div.project-item-desc(v-html="highlightSearch(setScreenshots(screenshot)[0], query)")

              img(loading="lazy" :src="setScreenshots(screenshot)[1]" :alt="setScreenshots(screenshot)[0]")

        span(v-if="item.project.videos !== ''" title="Play Video") 

          a.play-video(:href="encodeVideoName(item.project.videos, item.project.name)" target="_blank") Play Video

            img(loading="lazy" src="https://chriscorchado.com/images/play_video_new_window_icon.png" alt="Play Video Icon" width="20")

        div.project-technology(v-html="highlightSearch(item.project.technology, query)")
        
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ProjectService from "./../services/ProjectService";
import getMonthYear from "./../ts/getMonthYear";
import getLightboxCode from "./../ts/getLightboxCode";
import highlightSearch from "./../ts/highlightSearch";

@Component
export default class Project extends Vue {
  data: Array<object> = [];
  error = "";
  query = this.$route.query.q || "";

  async created() {
    try {
      this.data = await ProjectService.getProject(this.query);
      this.$store.commit("setRecords", this.data);
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

  highlightSearch = highlightSearch;
}
</script>

<style scoped lang="scss">
@import "./../scss/project.scss";
</style>
