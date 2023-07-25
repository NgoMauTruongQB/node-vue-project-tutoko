const express = require('express')
const Users = require('../models/Users')

class UserControllers {

    // [GET] /users/all-users
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

    // [POST] /users/add-user
    async addUser(req, res, next) {
        const user = new Users({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
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


