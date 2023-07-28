const express = require('express')
const Users = require('../models/Users')
const bcrypt = require('bcrypt')
const UsersInformation = require('../models/UsersInformation')

class AuthController {

    // [POST] /auth/register
    async register(req, res, next) {
        const { username, email, password, phone, role, status, } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        
        const user = new Users({
            username,
            email,
            password: hashedPassword,
            phone,
            role,
            status
        })
        const usersInformation = new UsersInformation({
            User_id: user._id,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            status_caption: req.body.status_caption,
            avatar: req.body.avatar,
        })

        const errors = []
        if (await Users.findOne({ username })) {
            errors.push("Username already exists")
        }
        if (await Users.findOne({ email })) {
            errors.push("Email already exists")
        }
        if (await Users.findOne({ phone })) {
            errors.push("Phone already exists")
        }

        if (errors.length > 0) {
            res.json({
            message: errors.join(", "),
            })
            return
        }
        await Promise.all([user.save(), usersInformation.save()])
            .then(result => {
                res.json({
                    message: "User registered successfully",
                    result
                })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = new AuthController