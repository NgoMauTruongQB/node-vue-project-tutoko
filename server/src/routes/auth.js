const express = require('express')
const router = express.Router()

const authController = require('../controllers/AuthController')

router.post('/register', authController.register)
router.post('/sign-in', authController.login)

module.exports = router