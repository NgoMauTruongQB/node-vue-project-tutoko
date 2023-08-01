const jwt = require('jsonwebtoken')

module.exports = (payload) => {
    const accessTokenExpiresIn = 300
    const refreshTokenExpiresIn = 30 * 24 * 60 * 60
    const accessToken = jwt.sign({
        _id: payload,
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: accessTokenExpiresIn })
    const refreshToken = jwt.sign({
        _id: payload,
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: refreshTokenExpiresIn })
    return { accessToken, refreshToken }
}