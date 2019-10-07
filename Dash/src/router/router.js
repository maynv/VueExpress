import Vue from "vue";
import Router from "vue-router";
import VRegister from "@/views/VRegister";
import VLogin from "@/views/VLogin";
//
import VUser from "@/views/VUser/VUser";
//
import HelloWorld from "@/components/HelloWorld";

import { APP_URL } from "@/common/constants";
Vue.use(Router)


const router = [
  {
    path: APP_URL.LOGIN.url,
    name: "login",
    component: VLogin
  },
  {
    path: APP_URL.REGISTER.url,
    name: "register",
    component: VRegister
  },
  {
    path: APP_URL.DASHBOARD.url,
    name: "VHome",
    component: HelloWorld
  },
  {
    path: APP_URL.PROFILE.url,
    name: "VUser",
    component: VUser
  }
];
export default router;
