const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const userId = req.user._id
  const sorting = req.query.sorting
  let sortRule = {}
  const keyword = (req.query.keyword || '')
  let searchRule = {}
  if (keyword) {
    searchRule = { $or: [{ 'name': { '$regex': keyword, '$options': 'i' } }, { 'category': { '$regex': keyword, '$options': 'i' } }]}
  }

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

  Restaurant.find({ userId, ...searchRule })
  .lean()
  .sort(sortRule)
  .then(restaurants => res.render('index', { restaurants,  keyword }))
  .catch(error => console.log(error))
})

module.exports = router