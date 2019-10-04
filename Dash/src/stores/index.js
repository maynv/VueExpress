import Vue from "vue";
import Vuex from "vuex";
import common from "./modules/common";
import authen from "./modules/authen";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    common,
    authen
  }
});

export default store;
