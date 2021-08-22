const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const keyword = req.query.keyword.trim()

  Restaurant.find({ $or: [{ 'name': { '$regex': keyword, '$options': 'i' } }, { 'category': { '$regex': keyword, '$options': 'i' } }] })  //參考https://stackoverflow.com/questions/47656515/updateone-on-mongodb-not-working-in-node-js
    .lean()
    .then(restaurants => res.render('index', { restaurants, keyword }))
    .catch(error => console.log(error))
})

module.exports = router