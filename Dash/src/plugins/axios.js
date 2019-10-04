"use strict";

import Vue from "vue";
import axios from "axios";
import store from "@/stores";

import {
  SHOW_LOADING,
  HIDE_LOADING,
  LOGOUT
} from "@/stores/types/actions";

import Utils from "@/common/utils";
import { COOKIE_ACCESS_TOKEN } from "@/common/constants";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.defaults.headers.common["Access-Token"] = Utils.getCookie(
  COOKIE_ACCESS_TOKEN
);

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);
let apiRequestCount = 0;

_axios.interceptors.request.use(
  config => {
    const showLoading = config.showLoading;
    if (config.contentType) {
      axios.defaults.headers.common["Content-Type"] = config.contentType;
    }
    // let vAcceptUnAuth = false;
    // if (config.acceptUnAuth !== null && config.acceptUnAuth) {
    //   vAcceptUnAuth = config.acceptUnAuth;
    // }
    if (!showLoading) {
      //
    } else {
      apiRequestCount++;
      if (apiRequestCount === 1) {
        store.dispatch(SHOW_LOADING);
      }
    }
    return config;
  },
  error => {
    // Do something with request error
    apiRequestCount = 0;
    // store.dispatch(SHOW_ERROR, error);
    store.dispatch(LOGOUT);
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  response => {
    // Do something with response data
    if (apiRequestCount > 0) {
      apiRequestCount--;
    }
    if (apiRequestCount === 0) {
      store.dispatch(HIDE_LOADING);
    }
    return response;
  },
  error => {
    // Do something with response error
    let vAcceptUnAuth = false;
    if (error.config.acceptUnAuth !== null && error.config.acceptUnAuth) {
      vAcceptUnAuth = error.config.acceptUnAuth;
    }
    /* Always Hide loading */
    store.dispatch(HIDE_LOADING);
    apiRequestCount = 0;
    /* Show error if need */
    const vStatus = error.response.status;
    if (vAcceptUnAuth) {
      // Do not thing
    } else {
      apiRequestCount = 0;
      // store.dispatch(SHOW_ERROR, error);
      if (vStatus && vStatus !== 501) {
        store.dispatch(LOGOUT);
      }
    }
    return Promise.reject(error);
  }
);

// eslint-disable-next-line no-unused-vars
Plugin.install = (Vue, options) => {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    }
  });
};

Vue.use(Plugin);

export default Plugin;
