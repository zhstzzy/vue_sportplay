import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
// 引入全局样式
import "./assets/css/global.css"
// 引入iconfont
import "./assets/font/iconfont.css"
// 引入 axios
import axios from './utils/axios'
import VueAxios from 'vue-axios'
import qs from "qs";

const app = createApp(App)
installElementPlus(app)
app.use(VueAxios,axios)
app.provide('axios',app.config.globalProperties.axios)
app.use(store).use(router).mount('#app')

app.config.globalProperties.qs = qs


// app.config.globalProperties.$axios = axios