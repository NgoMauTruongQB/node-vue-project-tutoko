const express = require('express')
const router = express.Router()

const authController = require('../controllers/AuthController')
const authenticated = require('../middlewares/authenticated')

router.post('/sign-up', authController.register)
router.post('/sign-in', authController.login)
router.post('/sign-out', authController.logout)
router.get('/refresh-token', authController.refresh)
router.get('/user-informations', authenticated ,authController.currentUser)

module.exports = router