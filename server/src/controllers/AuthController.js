const express = require('express')
const Users = require('../models/Users')
const bcrypt = require('bcrypt')
const UsersInformation = require('../models/UsersInformation')
const jwt = require('jsonwebtoken')

class AuthController {

    // [POST] /auth/register
    async register(req, res, next) {
        const { username, email, password, phone, role, status, firstname, lastname, status_caption, avatar} = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        
        const user = await new Users({
            username,
            email,
            password: hashedPassword,
            phone,
            role,
            status
        })
        const usersInformation = await new UsersInformation({
            User_id: user._id,
            firstname,
            lastname,
            status_caption,
            avatar,
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

    // [POST] /auth/login
    async login(req, res, next) {
        const { username, password } = req.body

        const user = await Users.findOne({
            username,
        })

        if (!user) {
            res.status(404).json({
                message: 'Username does not exits'
            })
            return
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (isPasswordValid) {
            const token = jwt.sign({
                _id: user._id,
            }, process.env.JWT_TOKEN)
            res.status(200).json({
                
                message: 'Login successful',
                token,
            });
        } else {
            res.status(401).json({
                message: 'Password is incorrect',
            })
        }
    }
    
}

module.exports = new AuthController