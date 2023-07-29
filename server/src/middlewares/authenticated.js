const jwt = require('jsonwebtoken')
const Users = require('../models/Users')
require('dotenv').config()

module.exports = (req, res, next) => {
    
    try {
        const token = req.cookies.token
        const idUser = jwt.verify(token, process.env.JWT_TOKEN)
        Users.findOne({
            _id: idUser
        })
        .then(data => {
            if(data) {
                req.data = data
                next()
            } else {
                res.json('Not permisstion')
            }
        })
        .catch(err => {

        })
    } catch (error) {
        res.status(500).json('Invalid token')
    }
}