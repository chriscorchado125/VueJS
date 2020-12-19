<template lang="pug">

  span

    a#skip-links.screen-reader(href='#content' style="position: absolute;left: -10000px;top: auto;width: 1px;height: 1px;overflow: hidden;" tabindex="0") Skip Navigation

    header#navigation

      nav.navbar.navbar-light.bg-light.fixed-top.navbar-fixed-top.shadow(aria-label="navigation-outer-wrapper")
        div#user-message
        div#navbar-collapse.navbar-collapse(aria-label="navigation-collapse-wrapper")
          div#navbar-nav.navbar-nav.show(role='navigation' aria-label='Navigation')

            router-link#logo.navbar-brand(to="/")
              img(loading='lazy' src="https://chriscorchado.com/images/chriscorchado-initials-logo.png" id="logo-image" :class="homeSelected" alt="Home")

            router-link(to="/history" class="nav-item nav-link" id="companies-link") Work

            router-link(to="/courses" class="nav-item nav-link" id="courses-link") Courses

            router-link(to="/projects" class="nav-item nav-link" id="project-link") Projects

            router-link(to="/contact" class="nav-item nav-link" id="contact-link") Contact

          <search-component v-if='pageIsSearchable' />

          <profile-component v-if='this.$route.name == "Index" || this.$route.name == "Contact"' />

          <resume-component v-if='this.$route.name == "Resume"' />

</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

import SearchComponent from "@/components/Search.vue";
import ProfileComponent from "@/components/Profile.vue";
import ResumeComponent from "@/components/ResumeOptions.vue";
import animateLogo from "./../../ts/animateLogo";

@Component({
  components: {
    SearchComponent,
    ProfileComponent,
    ResumeComponent,
  },
})

export default class SiteHeader extends Vue {
  homeSelected = "";

  created(): void {
    this.setHomeLogo();
    this.setMetaTags();
    animateLogo('logo-image', 'spin');
  }

  updated(): void {
    if (document.getElementById("skip-links")) {
      const skipLink = document.getElementById("skip-links");
      if (skipLink) {
        skipLink.focus();
      }
    }
  }

  mounted(): void {
    animateLogo('logo-image', '');
  }

  get pageIsSearchable(): boolean {
    if (
      this.$route.name == "Index" ||
      this.$route.name == "Contact" ||
      this.$route.name == "Resume"
    ) {
      return false;
    } else {
      return true;
    }
  }

  // home link uses a dashed border style around the logo
  // the other link styles are set in the router using linkActiveClass: "nav-item-active"
  setHomeLogo(): void {
    if (this.$route.name == "Index") {
      this.homeSelected = "homeSelected";
    } else {
      this.homeSelected = "";
    }
  }

  setMetaTags(): void {
    const htmlEL = document.querySelector("html");
    if (htmlEL) {
      htmlEL.setAttribute("lang", "en");
    }

    // Need for the Featherlight lightbox JS and CSS
    const scriptTag:any = document.createElement('script')
    scriptTag.setAttribute('src', 'https://chriscorchado.com/lightbox/js/jquery-3.5.1.min.js')
    document.head.appendChild(scriptTag)

    const link = document.createElement("link");
    link.href = "https://chriscorchado.com/images/chrisCorchado.ico";
    link.rel = "shortcut icon";
    link.type = "image/x-icon";
    document.getElementsByTagName("head")[0].appendChild(link);

    const keyword = document.createElement("meta");
    keyword.setAttribute("name", "keywords");
    keyword.setAttribute(
      "content",
      "Chris Corchado, Christian Corchado, Full Stack, Front End, Back End, Website, Web Application, UI, UX, User Interface, User Experience, Architect, Engineer, Programmer, Developer, Designer, Portfolio, Resume"
    );
    document.getElementsByTagName("head")[0].appendChild(keyword);

    const robots = document.createElement("meta");
    robots.setAttribute("name", "robots");
    robots.setAttribute("content", "index, follow");
    document.getElementsByTagName("head")[0].appendChild(robots);
  }

  @Watch("$route")
  onPropertyChanged(value: unknown): void {
    // @ts-ignore
    if (!value.query.page) {
      this.$store.commit("setPageNum", 1);
    }
    this.setHomeLogo();
  }

}
</script>

<style lang="scss">
@import "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css";
@import "./../../scss/variables.scss";
@import "./../../scss/chriscorchado.scss";
@import "./../../scss/header/navigation.scss";
</style>
