import Vue from "vue";
import Cookie from "vue-cookie";
import { QMODE_OPERATION } from "@/common/constants";
Vue.use(Cookie);

const isArray = arr => {
  return Array.isArray(arr) || arr instanceof Array;
};

const isDefined = value => {
  return typeof value !== "undefined";
};

const parsePassword = val => {
  let ret = "";
  let temps = val.split(":");
  if (temps.length < 3) {
    throw "Invalid format. greater than 2";
  } else if (temps.length === 3) {
    ret = temps[2];
  } else if (temps.length > 3) {
    temps.splice(0, 2);
    ret = temps.join(":");
  }
  return ret;
};

const equals = (o1, o2) => {
  if (o1 === o2) return true;
  if (o1 === null || o2 === null) return false;
  if (o1 !== o1 && o2 !== o2) return true; // NaN === NaN
  let t1 = typeof o1,
    t2 = typeof o2,
    length = 0,
    key = null,
    keySet = null;
  if (t1 === t2 && t1 === "object") {
    if (isArray(o1)) {
      if (!isArray(o2)) return false;
      if ((length = o1.length) === o2.length) {
        for (key = 0; key < length; key++) {
          if (!equals(o1[key], o2[key])) return false;
        }
        return true;
      }
    } else {
      if (isArray(o2)) return false;
      keySet = Object.create(null);
      for (key in o1) {
        if (!equals(o1[key], o2[key])) return false;
        keySet[key] = true;
      }
      for (key in o2) {
        if (!(key in keySet) && isDefined(o2[key])) return false;
      }
      return true;
    }
  }
  return false;
};

const createDate = dateString => {
  let ret = new Date(dateString);
  if (ret.toString() !== "Invalid Date") {
    return ret;
  }

  const patt = /[:]|[ ]|[.]/g;
  let dateArr = dateString
    .replace(patt, "-")
    .split("-")
    .map((value, index) => {
      if (index === 1) {
        return parseInt(value) - 1;
      }
      return parseInt(value);
    });
  return new Date(
    dateArr[0],
    dateArr[1],
    dateArr[2],
    dateArr[3],
    dateArr[4],
    dateArr[5]
  );
};

export default {
  encodedString(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  },

  decodedString(str) {
    if (!str || str === "") return "";
    return parsePassword(window.atob(str));
  },

  logicStringPassword(userName, password, prefix) {
    const _prefix = prefix || "HS:";
    return _prefix + userName + ":" + password;
  },

  setAuthInHeader(accessToken) {
    Vue.axios.defaults.headers.common["Access-Token"] = accessToken
      ? `${accessToken}`
      : null;
  },

  copyObject(obj) {
    let output, v, key;
    output = Array.isArray(obj) ? [] : {};

    for (key in obj) {
      v = obj[key];
      if (v) {
        output[key] = typeof v === "object" ? this.copyObject(v) : v;
      } else {
        output[key] = v;
      }
    }
    return output;
  },
  getCookie(id) {
    return Vue.cookie.get(id);
  },

  setCookie(id, value, opt) {
    Vue.cookie.set(id, value, opt);
  },

  deleteCookie(id) {
    Vue.cookie.delete(id);
  },

  compareObjects(o1, o2) {
    return equals(o1, o2);
  },
  randomString(len, charSet) {
    charSet =
      charSet ||
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";
    for (let i = 0; i < len; i++) {
      const randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
  },
  convertNumber(data, defaultValue) {
    defaultValue = !isNaN(defaultValue) ? defaultValue : null;
    const number = parseInt(data);
    return isNaN(number) ? defaultValue : number;
  },
  convertString(data, defaultValue) {
    if (typeof data === "string") {
      return data;
    }

    let string = defaultValue || "";
    if (typeof data === "number" || typeof data === "boolean") {
      string = data.toString();
    }
    return string;
  },
  preventInputKeydown(e) {
    /**
     * Allow: backspace, delete, tab, escape, enter
     */

    if (
      [8, 9, 13, 27, 46].indexOf(e.keyCode) !== -1 ||
      /**
       * Allow: Ctrl+A, Command+A, Ctrl+C, Command+C, Ctrl+R, Command+R, Ctrl+V, Command+V, Ctrl+X, Command+X
       */
      ((e.keyCode == 65 ||
        e.keyCode == 67 ||
        e.keyCode == 82 ||
        e.keyCode == 86 ||
        e.keyCode == 88) &&
        (e.ctrlKey === true || e.metaKey === true)) ||
      /**
       * Allow: home, end, left, right, down, up and allow when text is highlighted
       */
      (e.keyCode >= 35 && e.keyCode <= 40) ||
      (e.keyCode >= 112 && e.keyCode <= 123)
    ) {
      return;
    } else {
      e.preventDefault();
    }
  },

  preventNonNumeric(e) {
    /**
     * List keycode:
     * 'backspace' - 8, 'tab' - 9, 'enter' - 13, 'escape' - 27, 'home' - 35, 'end' - 36, 'delete' - 46
     * 'left' - 37, 'up' - 38, 'right' - 39, 'down' - 40
     * '0-9' - 48 - 57 and 96 -105
     * 'a' - 65, 'c' - 67, 'v' - 86, 'x' - 88
     * '.' - 110 (decimal point) and 190 (period)
     */
    /**
     * Allow: backspace, delete, tab, escape, enter
     */
    if (
      [8, 9, 13, 27, 46].indexOf(e.keyCode) !== -1 ||
      /**
       * Allow: Ctrl+A, Command+A, Ctrl+C, Command+C, Ctrl+R, Command+R, Ctrl+V, Command+V, Ctrl+X, Command+X
       */
      ((e.keyCode == 65 ||
        e.keyCode == 67 ||
        e.keyCode == 82 ||
        e.keyCode == 86 ||
        e.keyCode == 88) &&
        (e.ctrlKey === true || e.metaKey === true)) ||
      /**
       * Allow: home, end, left, right, down, up and allow when text is hightlighted
       */
      (e.keyCode >= 35 && e.keyCode <= 40) ||
      (e.keyCode >= 112 && e.keyCode <= 123)
    ) {
      return;
    }
    /**
     * Ensure that it is a number and stop the keypress
     */
    if (
      (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  },
};
