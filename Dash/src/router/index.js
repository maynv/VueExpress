import Vue from "vue";
import Router from "vue-router";
import Routes from "./router";
import Utils from "@/common/utils";
import { COOKIE_ACCESS_TOKEN } from "@/common/constants";
Vue.use(Router);
const requireAuth = (to, from, next) => {
  const loginPath = "/";
  const token = Utils.getCookie(COOKIE_ACCESS_TOKEN);
  if (token === null) {
    if (to.path !== loginPath) {
      next(loginPath);
    }
  } else {
    if (to.path === loginPath) {
      Utils.deleteCookie(COOKIE_ACCESS_TOKEN);
    }
    next();
  }
};
const checkLogin = (to, from, next) => {
  Utils.deleteCookie(COOKIE_ACCESS_TOKEN);
  next();
};
export default new Router({
  mode: "history",
  routes: Routes.map(route => ({
    path: route.path,
    name: route.name,
    beforeEnter: (route.name === "login" || route.name === "register") ? checkLogin : requireAuth,
    component: route.component
  }))
});