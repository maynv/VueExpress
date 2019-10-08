import Vue from "vue";

const VERSION = "";
const UNAUTHORIZED = 401;

let domain = "http://localhost:8888";
// let domainPrivacy = "https://hmxcpeweb.azurewebsites.net/";
// let router = null;

// if (process.env.VUE_APP_MODEL !== "" && process.env.VUE_APP_MODEL) {
//     router = require(`@/products/${process.env.VUE_APP_MODEL}/router`).default;

//     if (process.env.NODE_ENV !== "production") {
//         let config = require(`@/products/${process.env.VUE_APP_MODEL}/config/config.js`);
//         domain = config.DEV_URL;
//     }
// } else {
//     router = require(`@/products/base/router`).default;
//     if (process.env.NODE_ENV !== "production") {
//         let config = require(`@/products/base/config/config.js`);
//         domain = config.DEV_URL;
//     }
// }
const onUnauthorized = () => {
  router.push("/");
};

export const request = (method, url, data, options) => {
  let mainUrl = domain + VERSION + url;
  let acceptUnAuth = false;
  let requestParams = {};
  let showLoading = true;
  let vHasFullResponse = false;
  let contentType = null;
  if (options !== undefined && typeof options === "object") {
    //     //isUrl: Do not use /api/v1
    //     if (options.isUrl) {
    //         mainUrl = domain + url;
    //     }
    //     //acceptUnAuth: Accept Unauthorized status
    if (options.acceptUnAuth) {
      acceptUnAuth = options.acceptUnAuth;
    }
    //     //isPrivacy: Call API of Privacy Policy
    //     // if (options.isPrivacy) {
    //     //     mainUrl = domainPrivacy + VERSION + url;
    //     // }
    //     // showLoading: Show/Hide Loading dialog
    if (
      options.showLoading !== null &&
      options.showLoading !== undefined &&
      options.showLoading === false
    ) {
      showLoading = options.showLoading;
    }
    //     // queryOptions: Call API with special query params
    //     if (options.queryOptions && typeof options.queryOptions === "object") {
    //         requestParams = options.queryOptions;
    //     }
    //     if (options.hasFullResponse) {
    //         vHasFullResponse = options.hasFullResponse;
    //     }
    //     if (options.contentType) {
    //         contentType = options.contentType;
    //     }
  }
  return Vue.axios({
    method: method,
    url: mainUrl,
    data: data,
    params: requestParams,
    showLoading: showLoading,
    acceptUnAuth: acceptUnAuth,
    contentType: contentType
  })
    .then(result => {
      if (vHasFullResponse) {
        return result;
      }
      return result.data;
    })
    .catch(result => {
      const { status } = result.response;

      if (status === UNAUTHORIZED && !acceptUnAuth) onUnauthorized();
      throw result.response;
    });
};
