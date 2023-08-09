const express = require('express')
const router = express.Router()

const authenticated = require('../middlewares/authenticated')
const blogController = require('../controllers/BlogController.js')

router.post('/upload-images', blogController.uploadImage)
router.get('/open-image', blogController.openImage)

module.exports = router