<template lang="pug">

  main.container(role="main" v-if="dataLoaded")

    if error
      p #{ error }

    h1(id='content') Project Samples

    div.project-container

      div.project.col(v-for="item in this.$store.state.pageRecords" :key="item._id")

        div.project-title(v-html="highlightSearch(item.project.name, query)")

        div.project-company(v-html="highlightSearch(item.project.company_name, query) + ' (' + getMonthYear(item.project.project_date, 'yearOnly') + ')'")

        div.body-container(v-html="highlightSearch(item.project.description, query)")

        section(:class="setScreenshotClass(item.project.screenshots.length)" data-featherlight-gallery="" data-featherlight-filter="a")

          div.project-item.shadow(v-for="screenshot in item.project.screenshots" :key="screenshot._id" :title="item.project.name")

            a.gallery(:href="setScreenshots(screenshot)[1]")

              div.project-item-desc(v-html="highlightSearch(setScreenshots(screenshot)[0], query)")

              img(loading="lazy" :src="setScreenshots(screenshot)[1]" :alt="setScreenshots(screenshot)[0]")

        span(v-if="item.project.videos !== ''" title="Play Video")

          a.play-video(:href="encodeVideoName(item.project.videos, item.project.name)" target="_blank" rel="noopener" title="Opens in a new window") Play Video

            img(loading="lazy" src="https://chriscorchado.com/images/play_video_new_window_icon.png" alt="Play Video Icon" width="20")

        div.project-technology(v-html="highlightSearch(item.project.technology, query)")

</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';

import ProjectService from './../../services/ProjectService';

import getMonthYear from './../../ts/getMonthYear';
import getLightboxCode from './../../ts/getLightboxCode';
import highlightSearch from './../../ts/highlightSearch';
import noRecordsFound from './../../ts/noRecords';
import animateLogo from './../../ts/animateLogo';

@Component
export default class Project extends Vue {
  data = [];
  dataLoaded = false;
  error = '';
  query = this.$store.state.search;

  async created(): Promise<void> {
    try {
      this.data = await ProjectService.getProject();
      this.$store.commit('setRecords', this.data);
      this.dataLoaded = true;
      getLightboxCode();
      animateLogo('logo-image', '');
    } catch (err) {
      this.error = err.message;
    }
  }

  mounted(): void {
    animateLogo('logo-image', 'spin');
    this.updateMeta();
  }

  updateMeta(): void {
    const titleEl = document.querySelector('head title');
    if (titleEl) {
      titleEl.textContent = 'Project Samples | Chris Corchado';
    }

    const descEl = document.querySelector("[name='description']");
    if (descEl) {
      descEl.remove();
    }

    const desc = document.createElement('meta');
    desc.setAttribute('name', 'description');
    desc.setAttribute(
      'content',
      'Project samples to showcase some of my programming, design and animation skills'
    );
    document.getElementsByTagName('head')[0].appendChild(desc);
  }

  updated(): void {
    if (this.data.length == 0) {
      noRecordsFound(
        'no-records',
        this.$store.state.search,
        'navigation',
        'No matches found for'
      );
    } else {
      noRecordsFound('no-records', '', 'navigation', 'No matches found for');
    }
  }

  // needed for the highlight search to work
  beforeUpdate(): void {
    this.query = this.$route.query.q;
  }

  setScreenshots(item: string): Record<string, unknown> {
    // @ts-ignore
    return item.split(',');
  }

  setScreenshotClass(itemCount: string): string {
    return 'project-item-grid project-items' + itemCount;
  }

  encodeVideoName(urlParam: string, fileName: string): string {
    return `https://chriscorchado.com/video.html?url=${urlParam}&name=${encodeURIComponent(
      fileName
    )}`;
  }

  getMonthYear = getMonthYear;

  highlightSearch = highlightSearch;

  @Watch('$route')
  async onPropertyChanged(value: Record<string, []>): Promise<void> {
    this.data = await ProjectService.getProject(
      // @ts-ignore
      value.query.page,
      this.$route.query.dir,
      this.$store.state.search
    );
    this.$store.commit('setRecords', this.data);
  }
}
</script>

<style scoped lang="scss">
@import './../../scss/pages/project.scss';
@import './../../scss/header/search.scss';
</style>
