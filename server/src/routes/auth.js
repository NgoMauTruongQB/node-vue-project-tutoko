const express = require('express')
const router = express.Router()

const authController = require('../controllers/AuthController')

router.post('/register', authController.register)
router.post('/sign-in', authController.login)
router.post('/sign-out', authController.logout)
router.get('/refresh-token', authController.refresh)

module.exports = router