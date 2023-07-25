const userRouter = require('./users')

// function route(app) {
//     app.use('/users', userRouter)
// }

// module.exports = route

const router = require('express').Router()

router.use('/users', userRouter)

module.exports = router


