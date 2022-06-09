import {createRouter, createWebHistory} from 'vue-router';
import Login from "../components/LoginView.vue";
import Register from "../components/RegisterView.vue";
import Home from "../components/Home.vue";
import Welcome from "../components/Welcome.vue";
import UserList from "../components/admin/UserList.vue";
import Test from "../views/Demo");

const routes = [
  {
    path: "/",
    redirect: "/login",
  }, {
    path: "/login",
    component: Login,
    // component: () => import("../components/LoginView.vue")
  }, {
    path: "/register",
    component: Register,
  }, {
    path: "/home",
    component: Home,
    redirect: "/welcome",
    children: [
      {path: "/welcome", component: Welcome,},
      {path: "/user", component: UserList,},
    ]
  }, {
    path: "/test",
    component:Test,
  }
];

const router = createRouter({
  bash: '/',
  history: createWebHistory(),
  routes
});

// 挂载路由导航守卫l
router.beforeEach((to, from, next) => {
  // to 将要访问
  // from 从哪访问
  // next 接着干 next(url) 重定向到url上 next() 继续访问 to 路径
  if (to.path === "/login") return next();
  if (to.path === "/register") return next();
  // 获取user
  const userFlag = window.sessionStorage.getItem("user");// 取出当前用户
  if (!userFlag) return next("/login");//无值，返回登录页
  next();// 符合要求 放行  
});

export default router;
