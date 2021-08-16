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

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))

})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.goole_map
  const rating = req.body.rating
  const description = req.body.description
  console.log(req.body)
  return Restaurant.create({
    name,
    name_en,
    category,
    image,
    phone,
    google_map,
    rating,
    description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})