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
    },
    user_info_detail(postData, options) {
        return request("post", "/user_detail", postData, options);
    },
    user_info_update(postData, options) {
        return request("put", "/user_detail", postData, options);
    },
    user_validate(postData, options) {
        return request("post", "/user_validate", postData, options);
    },
    user_changePassword(postData, options) {
        return request("post", "/user_changepassword", postData, options);
    },
};

export default {
    about,
    auth
};
