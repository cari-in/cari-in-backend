const express = require('express')
const router = express.Router()

const {
  register,
  login,
  logout,
  question,

} = require('./auth')

router.post('/register', register)

router.post('/login', login)

router.post('/logout', logout)

router.post('/question', question)

module.exports = router