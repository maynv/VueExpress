import Vue from "vue";
import Router from "vue-router";
import VRegister from "@/views/VRegister";
import VLogin from "@/views/VLogin";
import HelloWorld from "@/components/HelloWorld";
Vue.use(Router)


const router = [
    {
        path: "/",
        name: "login",
        component: VLogin
    },
    {
        path: "/register",
        name: "register",
        component: VRegister
    },
    {
        path: "/home",
        name: "VHome",
        component: HelloWorld
    }

];
export default router;
