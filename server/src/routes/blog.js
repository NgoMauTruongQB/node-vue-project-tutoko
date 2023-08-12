const express = require('express')
const router = express.Router()

const authenticated = require('../middlewares/authenticated')
const blogController = require('../controllers/BlogController.js')

router.post('/upload-images',authenticated, blogController.uploadImage)
router.post('/post-blog',authenticated, blogController.createPost)
router.get('/post-blog', blogController.getPostBlog)

module.exports = router