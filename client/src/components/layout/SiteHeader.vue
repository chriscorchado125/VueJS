<template lang="pug">

  span

    a#skip-links.screen-reader(href='#content' style="position: absolute;left: -10000px;top: auto;width: 1px;height: 1px;overflow: hidden;" tabindex="0") Skip Navigation

    header#navigation

      nav.navbar.navbar-light.bg-light.fixed-top.navbar-fixed-top.shadow
        div#navbarCollapse.navbar-collapse
          div#navbar-nav.navbar-nav.show(role="navigation" aria-label="Main")

            router-link#logo.navbar-brand(to="/")
              img(src="https://chriscorchado.com/images/chriscorchado-initials-logo.png" title="Home" :class="homeSelected" alt="Chris Corchado Logo")

            router-link(to="/history" class="nav-item nav-link" id="companies-link") History

            router-link(to="/courses" class="nav-item nav-link" id="courses-link") Courses

            router-link(to="/projects" class="nav-item nav-link" id="project-link") Projects

            router-link(to="/contact" class="nav-item nav-link" id="contact-link") Contact

          <profile-component v-if='this.$route.name == "Index" || this.$route.name == "Contact"' />

          <search-component v-if='pageIsSearchable' />

</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

import SearchComponent from "@/components/Search.vue";
import ProfileComponent from "@/components/Profile.vue";

@Component({
  components: {
    SearchComponent,
    ProfileComponent
  }
})
export default class SiteHeader extends Vue {
  homeSelected = "";

  created() {
    this.setHomeLogo();
    this.setMetaTags();
  }

  updated() {
    const skipLink: any = document.getElementById("skip-links");
    skipLink.focus();
  }

  get pageIsSearchable() {
    if (this.$route.name == "Index" || this.$route.name == "Contact") return false;
    return true;
  }

  // home link uses a dashed border style around the logo
  // the other link styles are set in the router using linkActiveClass: "nav-item-active"
  setHomeLogo() {
    if (this.$route.name == "Index") {
      this.homeSelected = "homeSelected";
    } else {
      this.homeSelected = "";
    }
  }

  setMetaTags() {
    const htmlEL: any = document.querySelector("html");
    htmlEL.setAttribute("lang", "en");

    const link: any = document.createElement("link");
    link.href = "https://chriscorchado.com/images/chrisCorchado.ico";
    link.rel = "shortcut icon";
    link.type = "image/x-icon";
    document.getElementsByTagName("head")[0].appendChild(link);

    const desc: any = document.createElement("meta");
    desc.setAttribute("name", "description");
    desc.setAttribute("content", "Chris Corchado - Portfolio and Resume");
    document.getElementsByTagName("head")[0].appendChild(desc);

    const keyword: any = document.createElement("meta");
    desc.setAttribute("name", "keywords");
    desc.setAttribute(
      "content",
      "Chris Corchado, Christian Corchado, Web Engineeer, Full Stack Web Developer, Web Application Developer, Graphic Designer, Online Portfolio, Resume, Engineer, Programmer, Developer"
    );
    document.getElementsByTagName("head")[0].appendChild(keyword);
  }

  @Watch("$route")
  onPropertyChanged(value: any, oldValue: any) {
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
