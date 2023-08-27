const express = require('express')
const router = express.Router()

const userController = require('../controllers/UserController')
const authenticated = require('../middlewares/authenticated')

router.get('/', userController.getAll)
router.get('/:username', userController.getByUsername)
router.get('/email/:email', userController.getByEmail)
router.patch('/changePassword', authenticated, userController.changePassword)
router.patch('/information',authenticated, userController.changeInformation)
router.post('/', userController.addUser)

module.exports = router