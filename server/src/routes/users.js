const express = require('express')
const router = express.Router()

const userController = require('../controllers/UserController')

router.get('/', userController.getAll)
router.get('/:username', userController.getByUsername)
router.get('/email/:email', userController.getByEmail)
router.post('/', userController.addUser)

module.exports = router