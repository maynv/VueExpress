import api from '@/api';
import {
  ABOUT,
  TOKEN,
  USER
} from '../types/getters';
import {
  SET_ABOUT,
  SET_USER,
  SET_TOKEN
} from '../types/mutations';
import {
  FETCH_ABOUT,
  LOGIN,
  LOGOUT,
  REGISTER,
  FETCH_USER
} from '../types/actions';
import Utils from "@/common/utils";
import {
  COOKIE_ACCESS_TOKEN, COOKIE_USER
} from "@/common/constants";
const state = {
  user: null,
  about: null,
  token: Utils.getCookie(COOKIE_ACCESS_TOKEN)
};

const getters = {
  [ABOUT](state) {
    return state.about;
  },
  [TOKEN](state) {
    const hasToken = !!state.token || Utils.getCookie(COOKIE_ACCESS_TOKEN);
    return hasToken;
  },
  [USER](state) {
    return state.user;
  }
};

const actions = {
  [FETCH_ABOUT]({ commit }, { options }) {
    return api.AuthenticationService.about.get_about(options).then(data => commit(SET_ABOUT, data));
  },
  [LOGIN]({ commit }, { postData, options }) {
    return api.AuthenticationService.auth.login(postData, options).then(data => {
      if (data) {
        if (data.token) {
          commit(SET_TOKEN, data.token);
          Utils.setCookie(COOKIE_ACCESS_TOKEN, data.token);
        }
        if (data.userInfo) {
          Utils.setCookie(COOKIE_USER, data.userInfo.email);
        }
      }
    });
  },
  [LOGOUT]({ commit }) {
    Utils.deleteCookie(COOKIE_ACCESS_TOKEN);
    Utils.deleteCookie(COOKIE_USER);
    commit(SET_TOKEN, null);
    commit(SET_USER, null);
  },
  [REGISTER]({ commit }, { postData, options }) {
    return api.AuthenticationService.auth.register(postData, options).then(() => { });
  },
  [FETCH_USER]({ commit }, { postData, options }) {
    return api.AuthenticationService.auth.user_info(postData, options).then(data => commit(SET_USER, data));
  },
};
const mutations = {
  [SET_ABOUT](state, about) {
    state.about = about;
  },
  [SET_TOKEN](state, token) {
    state.token = token;
  },
  [SET_USER](state, user) {
    state.user = user;
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
