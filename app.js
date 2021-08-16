const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('Body-Parser')

const Restaurant = require('./models/restaurant')

const app = express()
const port = 3000

mongoose.connect('mongodb://localhost/restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection // 取得資料庫連線狀態
db.on('error', () => {
  console.log('mongodb error!') // 連線異常
})
db.once('open', () => {
  console.log('mongodb connected!') // 連線成功
})

app.get('/', (req, res) => {
  res.send('this is restaurant list project')
})


app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})