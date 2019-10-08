const AuthController = require('./controllers/AuthenticationController')
const AuthPolicyController = require('./policys/AuthenticationPolicyController')
module.exports = (app) => {
  app.post('/register', AuthPolicyController.register, AuthController.register),
    app.post('/login', AuthController.login),
    app.post('/user', AuthController.getUser),
    app.post('/user_detail', AuthController.getUserDetail),
    app.put('/user_detail', AuthController.updateUserDetail),
    app.post('/user_validate', AuthController.userValidate),
    app.post('/user_changepassword', AuthController.userChangePassword)
}