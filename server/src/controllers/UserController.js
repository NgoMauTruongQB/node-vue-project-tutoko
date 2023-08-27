const express = require('express')
const Users = require('../models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const generateTokens = require('../middlewares/generateTokens')
const UsersInformation = require('../models/UsersInformation')
const cloudinary = require('../config/cloudinary')
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'avatar',
        allowedFormats: ["jpg", "jpeg", "png"],
    },
})

const upload = multer({
    storage
})

class UserControllers {

    // [GET] /users
    async getAll(req, res, next) {
        await Users.find()
            .then(users => {
                res.json(users)
            })
            .catch(err => {
                next(err)
            })
    }

    // [GET] /users/:username
    async getByUsername(req, res, next) {
        await Users.findOne({ username: req.params.username })
            .then(user => {
                res.json(user)
            })
            .catch(err => {
                next(err)
            })
    }

    // [GET] /users/email/:email
    async getByEmail(req, res, next) {
        await Users.findOne({ email: req.params.email })
            .then(user => {
                res.json(user)
            })
            .catch(err => {
                next(err)
            })
    }

    // [PATCH] /users/changePassword
    async changePassword(req, res, next) {
        const {currentpassword, newpassword, username} = await req.body

        const user = await Users.findOne({ _id: req.userId })

        if (!user) {
            res.status(404).json({
                message: 'Username does not exits'
            })
            return
        }

        const hashedPassword = await bcrypt.hash(newpassword, 10)
        const isPasswordValid = await bcrypt.compare(currentpassword, user.password)
        if (isPasswordValid) {
            await Users.findOneAndUpdate({ username }, { password: hashedPassword})
            .then(result => {
                res.status(200).json({
                    message: 'Successfully, Please re-login to continue.',
                    result
                })
            })
            .catch(err => {
                next(err)
            })
        } else {
            res.status(404).json({
                message: 'Password is incorrect!'
            })
            return
        }
    }

    // [PATCH] /users/avatar
    async changeInformation(req, res, next) {
        try {
            upload.fields([{ name: 'file', maxCount: 1 }])(req, res, async function (err) {
                if (err) {
                    return next(err)
                }
    
                const username = req.body.username
                const firstName = req.body.firstName;
                const lastName = req.body.lastName
    
                const userToUpdate = await Users.findOne({ _id: req.userId })

                if (!userToUpdate) {
                    return res.status(404).json({ error: 'User not found' })
                }
    
                const existingUser = await Users.findOne({ username, _id: { $ne: req.userId } })
                if (existingUser) {
                    return res.status(400).json({ error: 'Username already exists' })
                }
    
                const userInformation = await UsersInformation.findOne({ User_id: req.userId })
                let updatePromises = []
    
                if (userInformation) {
                    if (req.files && req.files['file']) {
                        const file = req.files['file'][0]
                        const fileUrl = file.path;
                        updatePromises.push(
                            UsersInformation.findOneAndUpdate({ User_id: req.userId }, { avatar: fileUrl })
                        )
                    }
    
                    updatePromises.push(
                        Users.findOneAndUpdate({ _id: req.userId }, { username }),
                        UsersInformation.findOneAndUpdate({ User_id: req.userId }, { firstname: firstName, lastname: lastName })
                    )
                }
    
                Promise.all(updatePromises)
                    .then(results => {
                        res.json({
                            message: 'Changed successfully!',
                            results: results
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: err.message,
                        })
                    })
            })
        } catch (error) {
            next(error)
        }
    }
    
    // [POST] /users
    async addUser(req, res, next) {
        const password = req.body.password
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new Users({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone,
            role: req.body.role,
            status: req.body.status,
        })
        await user.save()
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = new UserControllers


