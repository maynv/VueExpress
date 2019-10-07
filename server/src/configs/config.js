const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = {
  port: process.env.PORT || 8888,
  db: {
    database: process.env.DB_NAME || 'dashDB',
    user: process.env.DB_USER || 'dashDB',
    password: process.env.DB_PASSWORD || 'dashDB',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './DASH_BD',
      operatorsAliases: Op
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}