const express = require('express')
const router = express.Router()

const authenticated = require('../middlewares/authenticated')
const blogController = require('../controllers/BlogController.js')

router.post('/upload-images', authenticated, blogController.uploadImage)
router.post('/post-blog', authenticated, blogController.createPost)
router.get('/post-blog', blogController.getPostBlog)
router.get('/list-blog', blogController.getListPost)
router.post('/liked', authenticated, blogController.likedPost)
router.get('/liked', authenticated, blogController.getLikedPost)
router.get('/post-archive', blogController.getPostArchive)
router.get('/post-personal', authenticated, blogController.getPostPersonal)

module.exports = router