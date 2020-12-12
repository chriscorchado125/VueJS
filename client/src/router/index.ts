import Vue from 'vue'
/* eslint no-unused-vars: "off" */
import VueRouter, { RouteConfig } from 'vue-router'
import VueMeta from 'vue-meta'

import Home from '../views/Home.vue'
import History from '../views/History.vue'
import Course from '../views/Course.vue'
import Project from '../views/Project.vue'
import Contact from '../views/Contact.vue'
import Resume from '../views/Resume.vue'

Vue.use(VueRouter)
Vue.use(VueMeta)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Index',
    component: Home
  },
  {
    path: '/history',
    name: 'History',
    component: History
  },
  {
    path: '/courses',
    name: 'Courses',
    component: Course
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Project
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/resume',
    name: 'Resume',
    component: Resume
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'nav-item-active'
})

export default router
