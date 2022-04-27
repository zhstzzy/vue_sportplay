import { createRouter, createWebHistory } from 'vue-router'
import Login from "../components/LoginFrom.vue"
import Home from "../components/Home.vue"

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path:"/home",
    component:Home,
  }
]

const router = createRouter({
  bash:'/',
  history: createWebHistory(),
  routes
})

export default router
