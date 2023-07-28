const userRouter = require('./users')
const authRouter = require('./auth')

const router = require('express').Router()

router.use('/users', userRouter)
router.use('/auth', authRouter)

module.exports = router


