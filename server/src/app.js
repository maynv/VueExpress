const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require("./configs/config")
const app = express()
const { sequelize } = require("./models");
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
const _PORT = config.port
require("./router")(app)
sequelize.sync().then(() => {
  app.listen(_PORT, () => {
    console.log(`Server running at: http://localhost:${_PORT}`);
  })
})
