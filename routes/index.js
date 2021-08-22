const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurants = require('./modules/restaurant')
const search = require('./modules/search')
const sort = require('./modules/sort')

router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/search', search)
router.use('/sort', sort)

module.exports = router