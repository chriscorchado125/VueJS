<template>
  <header id="navigation">
    <nav class="navbar navbar-light bg-light fixed-top navbar-fixed-top shadow">
      <div class="navbar-collapse" id="navbarCollapse">
        <div class="navbar-nav show" id="navbar-nav">
          <router-link to="/" class="navbar-brand" id="logo"
            ><img
              src="https://chriscorchado.com/images/chriscorchado-initials-logo.png"
              title="Home"
              alt="Chris Corchado Logo"
          /></router-link>

          <router-link to="/history" class="nav-item nav-link" id="companies-link"
            >History</router-link
          >

          <router-link to="/courses" class="nav-item nav-link" id="courses-link"
            >Courses</router-link
          >

          <router-link to="/projects" class="nav-item nav-link" id="project-link"
            >Project</router-link
          >

          <router-link to="/contact" class="nav-item nav-link" id="contact-link"
            >Contact</router-link
          >
        </div>

        <div id="profiles"></div>
      </div>

      <div id="search-container" role="search">
        <span id="searchCount" tabindex="8">Loading...</span>
        <label>
          <span class="screen-reader">Search</span>
          <input
            type="text"
            id="searchSite"
            placeholder="Search items"
            onkeyup="debounceMe(event)"
            onkeypress="return searchFilter(event)"
            class="ccBtn"
            title="Search"
            aria-label="Search"
            tabindex="9"
          />
        </label>
        <label>
          <span class="screen-reader">Clear Search</span>
          <button
            id="searchBtn"
            class="searchBtn"
            onclick="searchClear(SITE_SEARCH_ID)"
            aria-label="Clear Search"
            title="Clear search"
            role="button"
            tabindex="10"
          >
            clear
          </button>
        </label>

        <div id="pagination"></div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SiteHeader extends Vue {}
</script>

<style lang="scss">
@import "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css";
@import "./../scss/variables.scss";
@import "./../scss/chriscorchado.scss";
@import "./../scss/navigation.scss";
</style>
