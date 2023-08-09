const userRouter = require('./users')
const authRouter = require('./auth')
const cardRouter = require('./card')
const blogRouter = require('./blog')

const router = require('express').Router()

router.use('/users', userRouter)
router.use('/auth', authRouter)
router.use('/card', cardRouter)
router.use('/blog', blogRouter)

module.exports = router


