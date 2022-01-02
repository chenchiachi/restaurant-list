if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcryptjs')
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantList = require('../../restaurant.json').results

const db = require('../../config/mongoose')

const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    restaurantListIndex: [0, 1, 2]
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    restaurantListIndex: [3, 4, 5]
  }
]

db.once('open', () => {
  Promise.all(Array.from(SEED_USER, seedUser => {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(seedUser.password, salt))
      .then(hash => User.create({
        name: seedUser.name,
        email: seedUser.email,
        password: hash,
      }))
      .then(user => {
        const userId = user._id
        const restaurantData = seedUser.restaurantListIndex.map(i => {
          restaurantList[i].userId = userId
          return restaurantList[i]
        })
        return Restaurant.create(restaurantData)
      })
  }))
    .then(() => {
      console.log('done')
      process.exit()
    })
})