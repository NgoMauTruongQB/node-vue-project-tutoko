const express = require('express')
const Users = require('../models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const generateTokens = require('../middlewares/generateTokens')
const UsersInformation = require('../models/UsersInformation')

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
            errors.push('Username already exists')
        }
        if (await Users.findOne({ email })) {
            errors.push('Email already exists')
        }
        if (await Users.findOne({ phone })) {
            errors.push('Phone already exists')
        }

        if (errors.length > 0) {
            res.status(500).json({
                message: errors.join(", "),
            })
            return
        }
        await Promise.all([user.save(), usersInformation.save()])
            .then(result => {
                res.json({
                    message: 'User registered successfully',
                    result
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message,
                })
            })
    }

    // [POST] /auth/sign-in
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
            const token = generateTokens(user._id)
            await Users.findOneAndUpdate({ _id: user._id }, { refreshToken: token.refreshToken })
            res.status(200).json({
                message: 'Login successful',
                refreshToken: token.refreshToken,
                accessToken: token.accessToken,
            })
        } else {
            res.status(401).json({
                message: 'Password is incorrect',
            })
        }
    }

    // [POST] /auth/sign-out
    async logout(req, res, next) {
        try {
            const authorizationHeader = req.headers.authorization
            const bearerToken = authorizationHeader.split('Bearer ')[1]
            await Users.findOneAndUpdate( { refreshToken: bearerToken }, { refreshToken: ""})
            res.status(200).json({
                message: 'Logout successful',
                accessToken: '',
            })
        } catch (error) {
            res.status(500).json({ message: 'You are not logged in, so you cannot logout.' })
        }
    }

    // [GET] /auth/user-informations
    async currentUser(req, res, next) {
        try {
            const user = await Users.findById({ _id: req.userId})
            const usersInformation = await UsersInformation.findOne({ User_id: req.userId})
            res.status(200).json({
                message: 'Successfully!',
                user: user,
                usersInformation: usersInformation,
            })
        } catch (error) {
            res.status(500).json({ message: 'Not Permisstion!' })
        }
        
    }

    // [GET] /auth/refresh-token
    async refresh(req, res, next) {
        try {
            const authorizationHeader = req.headers.authorization
            if (authorizationHeader) {
                const bearerToken = authorizationHeader.split('Bearer ')[1]
                const decodedToken = jwt.verify(bearerToken, process.env.REFRESH_TOKEN_SECRET)
                const user = await Users.findOne({ _id: decodedToken._id })
                if (user) {
                    const accessToken = jwt.sign({
                        _id: user._id,
                    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 900 })
                    res.status(200).json({
                        accessToken,
                    })
                } else {
                    res.status(401).json({
                        message: 'You have not signed in',
                    })
                }
            } else {
                res.status(403).json({
                    message: 'No authorization header found',
                })
            }
        } catch (error) {
            res.status(500).json({ error })
        }
    }
}

module.exports = new AuthController