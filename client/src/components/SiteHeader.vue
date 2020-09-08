<template lang="pug">

  header#navigation

    nav.navbar.navbar-light.bg-light.fixed-top.navbar-fixed-top.shadow
      div#navbarCollapse.navbar-collapse
        div#navbar-nav.navbar-nav.show

          router-link#logo.navbar-brand(to="/")
            img(src="https://chriscorchado.com/images/chriscorchado-initials-logo.png" title="Home" :class="homeSelected" alt="Chris Corchado Logo")

          router-link(to="/history" class="nav-item nav-link" id="companies-link") History

          router-link(to="/courses" class="nav-item nav-link" id="courses-link") Courses          

          router-link(to="/projects" class="nav-item nav-link" id="project-link") Project

          router-link(to="/contact" class="nav-item nav-link" id="contact-link") Contact

        <profile-component v-if='currentRouteName == "Index"' />

        <search-component v-if='pageIsSearchable' />

      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import { Watch } from "vue-property-decorator";
import Component from 'vue-class-component'
import SearchComponent from "@/components/Search.vue";
import ProfileComponent from "@/components/Profile.vue";

@Component({
  components: {
    SearchComponent,
    ProfileComponent,
  }
})

export default class SiteHeader extends Vue {
  homeSelected = ''
  currentPage = '';

  created(){
    // home link uses a dashed border style around the logo
    // the other link styles are set in the router using linkActiveClass: "nav-item-active"
    if(this.$route.name == "Index") this.homeSelected = 'homeSelected'
  }

  get currentRouteName() {
    this.currentPage = location.href;
    return this.$route.name;
  }

  get pageIsSearchable() {
    if(this.currentRouteName == "Index" || this.currentRouteName == "Contact") return false
    return true;
  } 

  @Watch("currentPage")
  onPropertyChanged(value: string, oldValue: string) {
    console.log(value, oldValue)
    // TODO add reactivity for routing
    this.$store.state.search = ''
    

    if(value !== oldValue && oldValue) location.href = this.currentPage;
  }
}
</script>

<style lang="scss">
@import "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css";
@import "./../scss/variables.scss";
@import "./../scss/chriscorchado.scss";
@import "./../scss/navigation.scss";
</style>
