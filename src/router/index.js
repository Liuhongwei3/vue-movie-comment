import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/showMovie",
    name: "MovieDetail",
    component: () =>
      import(/* webpackChunkName: "detail" */ "../views/movie/MovieDetail.vue"),
  },
  {
    path: "/user",
    name: "User",
    component: () =>
      import(/* webpackChunkName: "user" */ "../views/user/User.vue"),
  },
  {
    path: "/user/login",
    name: "UserLogin",
    component: () =>
      import(/* webpackChunkName: "user" */ "../views/user/Login.vue"),
  },
  {
    path: "/user/register",
    name: "UserRegister",
    component: () =>
      import(/* webpackChunkName: "user" */ "../views/user/Register.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/admin/Admin.vue"),
  },
  {
    path: "/admin/login",
    name: "AdminLogin",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/admin/Login.vue"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
