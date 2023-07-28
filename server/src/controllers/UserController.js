const express = require('express')
const Users = require('../models/Users')
const bcrypt = require('bcrypt')

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


