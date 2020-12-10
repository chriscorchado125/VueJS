<template>
  <div id="app">
    <SiteHeader />
    <!--keep-alive include="[History, Course, Project]">
    <transition name="fade"-->
    <router-view />
    <!--/transition>
    </keep-alive-->
    <SiteFooter />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import SiteHeader from "@/components/layout/SiteHeader.vue";
import SiteFooter from "@/components/layout/SiteFooter.vue";

@Component({
  components: {
    SiteHeader,
    SiteFooter,
  },
})
export default class App extends Vue {}
</script>

<style scoped>
/*
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.05s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
*/
</style>
