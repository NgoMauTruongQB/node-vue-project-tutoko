const userRouter = require('./users')
const authRouter = require('./auth')
const cardRouter = require('./card')

const router = require('express').Router()

router.use('/users', userRouter)
router.use('/auth', authRouter)
router.use('/card', cardRouter)

module.exports = router


