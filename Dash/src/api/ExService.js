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
  },
  auth_user_update(data) {
    let postData = {};
    postData = {
      id: data.id,
      email: data.email,
      username: data.username,
      password: data.password,
      avatarUrl: data.avatarUrl,
      phoneNumber: data.phoneNumber,
      address: data.address,
      gender: data.gender,
      description: data.description,
    }
    return postData;
  },
  auth_user_password_validate(data) {
    let postData = {};
    postData = {
      email: data.email,
      password: data.password
    }
    return postData;
  },
  auth_user_change_password(data) {
    let postData = {};
    postData = {
      email: data.email,
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      reNewPassword: data.reNewPassword,
    }
    return postData;
  }
};

export default {
  auth_ex
};