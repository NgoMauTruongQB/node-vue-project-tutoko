const express = require('express')
const Flashcards = require('../models/FlashCards')
const ListsFlashCards = require('../models/ListsFlashCards')
const Users = require('../models/Users')
const UsersInformation = require('../models/UsersInformation')

class CardControllers {

    // [GET] /card/lists-flashcards
    async getAllListFlashcards(req, res, next) {
        await ListsFlashCards.find()
        .then(listsFlashcards => {
            res.status(200).json({
                message: 'Successfully!',
                listsFlashcards
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Not found!'
            })
        })
    }    

    // [POST] /card/list-flashcards
    async addListFlashCards(req, res, next) {
        try {
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
        } catch (error) {
            next(error)
        }
    }

    // [GET] /card/list-set-cards
    async getAllSetCards(req, res, next) {
        try {
            const { id } = req.query
            
            const listFlashCards = await ListsFlashCards.findById(id)
            if (!listFlashCards) {
                return res.status(500).json({
                    message: 'ListFlashCards not found!'
                })
            }
    
            const author = await UsersInformation.findOne({ User_id: listFlashCards.author_id })
            if (!author) {
                return res.status(500).json({
                    message: 'Author not found!'
                })
            }
    
            const flashcards = await Flashcards.find({ id_list_flashcards: id })
    
            res.status(200).json({
                name: author.firstname + " " + author.lastname,
                topic: listFlashCards.topic,
                type: listFlashCards.type,
                setCards: flashcards
            })
        } catch (error) {
            next(error)
        }
    }

    // [POST] /card/set-cards
    async addSetCards(req, res, next) {
        try {
            const { setCards, listCardsId } = req.body;
            const listsFlashcards = await ListsFlashCards.findById({ _id: listCardsId })
        
            if (!listsFlashcards) {
                return res.status(500).json({
                    message: 'Not found!',
                })
            }
        
            const list = setCards.map(element => ({
                id_list_flashcards: listCardsId,
                reverse_side: element.reverse_side,
                face_side: element.face_side,
            }))
        
            const result = await Flashcards.insertMany(list)
            res.status(200).json({
                message: 'Created successfully!',
                result,
            })
        } catch (err) {
            next(err)
        }
    }
      

}

module.exports = new CardControllers


