const Joi = require('joi')

module.exports = {
  register(req, res, next) {
    const schema = {
      email: Joi.string().email(),
      username: Joi.string(),
      password: Joi.string()
    }
    const { error } = Joi.validate(req.body, schema)
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send(
            { error: "Invalid Email" }
          )
          break;
        case 'username':
          res.status(400).send(
            { error: "Invalid UserName" }
          )
          break;
        case 'password':
          res.status(400).send(
            { error: "Invalid Password" }
          )
          break;
        default:
          res.status(400).send(
            { error: "Unknown Error" }
          )
      }
    } else {
      next()
    }
  }
}