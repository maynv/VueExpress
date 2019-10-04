// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "@/router";
import store from "@/stores";
import I18n from "@/plugins/i18n";
import "@/plugins/axios";
import "@/plugins/element";
import VeeValidate from "vee-validate";
import Cookie from "vue-cookie";

import { DICTIONARIES } from "@/config/config";
let vLanguage = "en";
Vue.config.productionTip = false;
I18n.locale = vLanguage;
Vue.use(Cookie);
Vue.use(VeeValidate, {
  aria: true,
  classNames: {},
  classes: false,
  delay: 0,
  dictionary: DICTIONARIES,
  errorBagName: "errors", // change if property conflicts
  events: "change|blur|input|click",
  fieldsBagName: "fields",
  i18n: I18n, // the vue-i18n plugin instance
  i18nRootKey: "validations", // the nested key under which the validation messages will be located
  inject: true,
  validity: false
});
/* eslint-disable no-new */
new Vue({
  router: router,
  store: store,
  i18n: I18n,
  render: h => h(App)
}).$mount("#app");
