import { createRouter, createWebHistory } from 'vue-router'
import Login from "../components/LoginFrom.vue"

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: Login,
  },
]

const router = createRouter({
  bash:'/',
  history: createWebHistory(),
  routes
})

export default router
