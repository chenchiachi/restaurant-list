const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('Body-Parser')

const app = express()
const port = 3000


app.get('/', (req, res) => {
  res.send('this is restaurant list project')
})


app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})