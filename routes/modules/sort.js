const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')


router.get('/', (req, res) => {
  const sorting = req.query.sorting
  let sortRule = {}

  switch (sorting) {
    case 'AtoZ':
      sortRule = { name: 'asc' }
      break
    case 'ZtoA':
      sortRule = { name: 'desc' }
      break
    case 'category':
      sortRule = { category: 'asc' }
      break
    case 'location':
      sortRule = { location: 'asc' }
      break
    default:
      sortRule = { _id: 'asc' }
  }


  Restaurant.find()
    .lean()
    .sort(sortRule)
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})



module.exports = router