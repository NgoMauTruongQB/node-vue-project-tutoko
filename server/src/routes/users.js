const express = require('express')
const router = express.Router()

const userControllers = require('../controllers/UserControllers')

router.get('/all-users', userControllers.getAll)
router.get('/:username', userControllers.getByUsername)
router.get('/email/:email', userControllers.getByEmail)
router.post('/add-user', userControllers.addUser)

module.exports = router