const express = require('express')
const Flashcards = require('../models/FlashCards')
const ListsFlashCards = require('../models/ListsFlashCards')
const Users = require('../models/Users')

class CardControllers {

    // [GET] /card/lists-flashcards
    async getAllListFlashcards(req, res, next) {
        await ListsFlashCards.find()
        .then(listsFlashcards => {
            res.status(200).json({
                status: 'Successfully!',
                listsFlashcards
            })
        })
        .catch(err => {
            res.status(500).json({
                status: 'Not found!'
            })
        })
    }

    // [POST] /card/list-flashcards
    async addListFlashCards(req, res, next) {
        const { topic, type } = await req.body
        const user = await Users.findById({ _id: req.userId})
        if(user) {
            const ListFlashCards = new ListsFlashCards({
                topic,
                type,
                author_id: user._id 
            })
            await ListFlashCards.save()
                .then(result => {
                    res.status(200).json({
                        message: 'Created successfully!',
                        result
                    })
                })
                .catch(err => {
                    next(err)
                })
        }
    }

}

module.exports = new CardControllers


