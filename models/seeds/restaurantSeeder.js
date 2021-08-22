
const Restaurant = require('../restaurant')
const restaurantJson = require('../../restaurant.json')

const db = require('../../config/mongoose')

const restaurantList = restaurantJson.results.map(restaurant => {
  return {
    name: restaurant.name,
    name_en: restaurant.name_en,
    category: restaurant.category,
    image: restaurant.image,
    location: restaurant.location,
    phone: restaurant.phone,
    google_map: restaurant.google_map,
    rating: restaurant.rating,
    description: restaurant.description
  }
})

db.once('open', () => {
  restaurantList.forEach(restaurant => {
    Restaurant.create(restaurant)
  })
  console.log('mongodb connected!')
})