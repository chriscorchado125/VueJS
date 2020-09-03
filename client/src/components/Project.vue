<template lang="pug">
  main.container(role="main")

    h1 Projects
    
    if error
      p #{ error }

    div.project-container.row

      div.project.col(v-for="items in data" :key="items._id")

        div.project-title {{ items.project.name }}

        div.project-company {{ items.project.company_name }} #[span.project-date {{ getMonthYear(items.project.project_date, 'yearOnly') }}]

        div.body-container(v-html="items.project.description")

        section(:class="setScreenshotClass(items.project.screenshots.length)" data-featherlight-gallery="" data-featherlight-filter="a" )

          div.project-item.shadow(v-for="screenshot in items.project.screenshots" :key="screenshot._id" :title="cleanName(setScreenshots(screenshot)[0])")
            
            a.gallery(:href="setScreenshots(screenshot)[1]")

              div.project-item-desc {{ setScreenshots(screenshot)[0] }}

              img(loading="lazy" :src="setScreenshots(screenshot)[1]" :alt="setScreenshots(screenshot)[0]")

        span(v-if="items.project.videos !== ''" title="Play Video") 

          a.play-video(:href="encodeVideoURI(items.project.videos, items.project.name)" target="_blank") Play Video

            img(loading="lazy" src="https://chriscorchado.com/images/play_video_new_window_icon.png" alt="Play Video Icon" width="20")

        div.project-technology {{ items.project.technology }}
        
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
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
      getLightboxCode();
    } catch (err) {
      this.error = err.message;
    }
  }

  setScreenshotClass(itemCount) {
    return "project-item-grid project-items" + itemCount;
  }

  setScreenshots(item) {
    return item.split(",");
  }

  cleanName(val) {
    return val.replace(/(<([^>]+)>)/gi, "");
  }

  encodeVideoURI(url, fileName) {
    return `https://chriscorchado.com/video.html?url=${url}&name=${encodeURIComponent(
      fileName
    )}`;
  }

  getMonthYear = getMonthYear;
}
</script>

<style scoped lang="scss">
@import "./../scss/project.scss";
</style>
