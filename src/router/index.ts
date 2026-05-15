import About from '@/pages/About.vue'
import Home from '@/pages/Home.vue'
import Details from '@/pages/Details.vue'
import Cinema from '@/pages/Cinema.vue'
import EditCinema from '@/pages/EditCinema.vue'
import AddCinema from '@/pages/AddCinema.vue'
import EditTimetable from '@/pages/EditTimetable.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AddTimetable from "@/pages/AddTimetable.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/about',
      component: About,
      meta: {
        title: 'About'
      }
    },
    {
      path: '/details/:id',
      component: Details,
      meta: {
        title: 'Details'
      }
    },
    {
      path: '/cinemas',
      component: Cinema,
      meta: {
        title: 'Cinemas'
      }
    },
    {
      path: '/cinemas/add',
      component: AddCinema,
      meta: {
        title: 'Add Cinema'
      }
    },
    {
      path: '/cinemas/:id',
      component: EditCinema,
      meta: {
        title: 'Edit Cinema'
      }
    },
    {
      path: '/timetable/:id',
      component: EditTimetable,
      meta: {
        title: 'Edit Timetable'
      }
    },
    {
      path: '/timetable/add',
      component: AddTimetable,
      meta: {
        title: 'Add Timetable'
      }
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} | PSEP 2026`
  }
  next()
})
export default router
