import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import VueMeta from "vue-meta";

import Home from "../views/Home.vue";
import History from "../views/History.vue";
import Course from "../views/Course.vue";
import Project from "../views/Project.vue";
import Contact from "../views/Contact.vue";

Vue.use(VueRouter);
Vue.use(VueMeta);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Index",
    component: Home,
    meta: {
      title: "Chris Corchado - Homepage - Portfolio and Resume",
      metaTags: [
        {
          name: "description",
          content: "Chris Corchado - Portfolio and Resume"
        },
        {
          property: "og:description",
          content: "Chris Corchado - Portfolio and Resume"
        }
      ]
    }
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
  routes,
  linkActiveClass: "nav-item-active"
});

export default router;
