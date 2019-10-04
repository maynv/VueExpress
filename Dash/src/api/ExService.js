const auth_ex = {
    auth_login(data) {
        let postData = {};
        postData = {
            email: data.id,
            password: data.password
        }
        return postData;
    },
    auth_register(data) {
        let postData = {};
        postData = {
            username: data.userName,
            email: data.email,
            password: data.password
        }
        return postData;
    },
    auth_user(data) {
        let postData = {};
        postData = {
            email: data.email
        }
        return postData;
    }
};

export default {
    auth_ex
};