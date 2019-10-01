const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
const _PORT = process.env.PORT || 8002
app.get('/status', (req, res) => {
  res.send({
    msg: 'Dash'
  })
})
app.listen(_PORT, () => {
  console.log(`Server running at: http://localhost:${_PORT}`);
})