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
  }
}