const jwt = require('jsonwebtoken')
const Users = require('../models/Users')

const verifyAccessToken = (accessToken) => {
    try {
        return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    } catch (err) {
        return null
    }
}

const checkRefreshTokenInDatabase = async (refreshToken) => {
    try {
        const token = await Users.findOne({ refreshToken: refreshToken })
        if (token) {
            const data = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
            return data
        } else {
            return null
        }
    } catch (err) {
        return null
    }
}

module.exports = async (req, res, next) => {
    const accessToken = req.cookies.accessToken

    const authorizationHeader = req.headers.authorization
    const refreshToken = authorizationHeader && authorizationHeader.startsWith('Bearer ') ? authorizationHeader.split('Bearer ')[1] : null

    if (!accessToken && !refreshToken) {
        return res.status(401).json({ message: 'Access token and refresh token not found.' })
    }

    const decodedAccessToken = verifyAccessToken(accessToken)

    if (decodedAccessToken) {
        req.userId = decodedAccessToken._id
        return next()
    } else {
        const isValidRefreshToken = await checkRefreshTokenInDatabase(refreshToken)

        if (isValidRefreshToken) {
            const newAccessToken = jwt.sign({ _id: isValidRefreshToken._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 300 })
            res.cookie('accessToken', newAccessToken, { httpOnly: true, maxAge: 300000 })

            req.userId = isValidRefreshToken._id;
            return next()
        } else {
            return res.status(403).json({ message: 'Invalid refresh token or refresh token not found in the database.' })
        }
    }
}