import { request } from "./Base";
const about = {
    get_about(options) {
        return request("get", "/about", {}, options);
    }
};

const auth = {
    login(postData, options) {
        return request("post", "/login", postData, options);
    },
    register(postData, options) {
        return request("post", "/register", postData, options);
    },
    user_info(postData, options) {
        return request("post", "/user", postData, options);
    }
};

export default {
    about,
    auth
};
