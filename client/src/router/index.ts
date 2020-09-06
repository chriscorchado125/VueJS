import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import Home from "../views/Home.vue";
import History from "../views/History.vue";
import Course from "../views/Course.vue";
import Project from "../views/Project.vue";
import Contact from "../views/Contact.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/history",
    name: "History",
    component: History
  },
  {
    path: "/courses",
    name: "Courses",
    component: Course
  },
  {
    path: "/projects",
    name: "Projects",
    component: Project
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
