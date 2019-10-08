const { User, UserDetail } = require('../models')
const JSWebToken = require('jsonwebtoken')
const config = require('./../configs/config')

function jwtSign(user) {
  const TIME = 60 * 60 * 24 // one day
  return JSWebToken.sign(user, config.authentication.jwtSecret, {
    expiresIn: TIME
  })
}

module.exports = {
  async register(req, res) {
    try {
      const user = await User.create(req.body)
      await UserDetail.create(req.body)
      res.send(user.toJSON())
    } catch (err) {
      res.status(400).send({
        err: err
      })
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body
      const user = await UserDetail.findOne({
        where: {
          email: email
        }
      })
      if (!user) {
        return res.status(403).send({
          err: "The Email is incorrect!"
        })
      } else if (password === user.password) {
        const UserJson = user.toJSON()
        res.send({
          userInfo: UserJson,
          token: jwtSign(UserJson)
        })
      } else {
        return res.status(403).send({
          err: "The Password is incorrect!"
        })
      }
    } catch (err) {
      res.status(403).send({
        err: err
      })
    }
  },
  async getUser(req, res) {
    try {
      const { email } = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })

      if (user) {
        const UserJson = user.toJSON()
        res.send(UserJson)
      } else {
        return res.status(403).send({
          err: "Invalid Token"
        })
      }
    } catch (err) {
      res.status(403).send({
        err: err
      })
    }
  },
  async getUserDetail(req, res) {
    try {
      const { email } = req.body

      const user = await UserDetail.findOne({
        where: {
          email: email
        }
      })
      if (user) {
        const UserJson = user.toJSON()
        res.send(UserJson)
      } else {
        return res.status(403).send({
          err: "Invalid Token"
        })
      }
    } catch (err) {
      res.status(403).send({
        err: err
      })
    }
  },
  async updateUserDetail(req, res) {
    const { email } = req.body
    try {
      const user = await UserDetail.update(req.body, {
        where: { email: email }
      })
      if (user) {
        res.status(200).send(req.body)
      } else {
        return res.status(403).send({
          err: "Invalid Token"
        })
      }
    } catch (err) {
      res.status(403).send({
        err: err
      })
    }
  },
  async userValidate(req, res) {
    const { email, password } = req.body
    try {
      const user = await User.findOne(req.body, {
        where: { email: email }
      })
      const userJS = user.toJSON()
      if (userJS && userJS.password === password) {
        res.status(200).send(req.body)
      } else {
        return res.status(500).send({
          err: "Password incorrect"
        })
      }
    } catch (err) {
      res.status(500).send({
        err: err
      })
    }
  },
  async userChangePassword(req, res) {
    const { email, oldPassword, newPassword, reNewPassword } = req.body
    const newRecord = {
      email: email,
      password: newPassword
    }
    try {
      const vUser = await User.findOne(req.body, {
        where: { email: email }
      })
      if (vUser && oldPassword === vUser.toJSON().password && newPassword === reNewPassword) {
        const user = await User.update(newRecord, {
          where: { email: email }
        })
        await UserDetail.update(newRecord, {
          where: { email: email }
        })
        if (user) {
          res.status(200).send(req.body)
        } else {
          res.status(500).send({
            err: "Unkown error"
          })
        }
      } else {
        res.status(500).send({
          err: "Invalid Password"
        })
      }

    } catch (err) {
      res.status(500).send({
        err: err
      })
    }
  }
}