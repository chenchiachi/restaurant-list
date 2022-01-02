const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', function (req, res, next) {
  const { email, password } = req.body
  if (!email || !password) {
    req.flash('warning_msg', '請輸入Email和密碼。')
    return res.redirect('/users/login')
  }
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      req.flash('warning_msg', info.message)
      return res.redirect('/users/login')
    }
    req.logIn(user, function (err) {
      if (err) { return next(err) }
      return res.redirect('/')
    })
  })(req, res, next)
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!email) {
    errors.push({ message: '請填寫email。' })
  }
  if (!password) {
    errors.push({ message: '請填寫密碼。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不符。' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: '此Email已註冊。'})
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    } 
    return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '已登出。')
  res.redirect('/users/login')
})

module.exports = router