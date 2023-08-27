const express = require('express')
const Flashcards = require('../models/FlashCards')
const ListsFlashCards = require('../models/ListsFlashCards')
const Users = require('../models/Users')
const UsersInformation = require('../models/UsersInformation')

class CardControllers {

    // [GET] /card/lists-flashcards
    async getAllListFlashcards(req, res, next) {
        await ListsFlashCards.find({ $or: [{ deleted: { $exists: false } }, { deleted: false }] })
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
            const { id } = await req.query
            
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
                name: author.firstname + ' ' + author.lastname,
                topic: listFlashCards.topic,
                type: listFlashCards.type,
                setCards: flashcards
            })
        } catch (error) {
            next(error)
        }
    }

    // [DELETE] /card/list-set-cards
    async deleteSetCards(req, res, next) {
        try {
            const { id } = await req.query
            const listFlashCards = await ListsFlashCards.findById(id)
            const author_id = await ListsFlashCards.findOne({ author_id: req.userId})

            if(!author_id) {
                return res.status(403).json({
                    message: 'You are not the author, so you cannot edit!',
                })
            }

            if (!listFlashCards) {
                return res.status(500).json({
                    message: 'ListFlashCards not found!'
                })
            }

            listFlashCards.deleted = true
            listFlashCards.deletedAt = new Date()
            await listFlashCards.save()

            await Flashcards.updateMany(
                { id_list_flashcards: id },
                { $set: { deleted: true, deletedAt: new Date() } }
            )

            .then(result => {
                res.status(200).json({
                    message: 'Delete successfully!'
                })
            })
            .catch(err => {
                next(err)
            })

        } catch (error) {
            next(error)
        }
    }

    // [GET] /card/trashed-setcards
    async getTrashedSetCards (req, res, next) {
        try {
            await ListsFlashCards.find({
                deleted: false,
                author_id: req.userId
            })
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

        } catch (error) {
            next(error)
        }
    }

    // [PUT] /card/restore-setcards
    async restoreSetCards(req, res, next) {
        try {
            const { id } = req.query
            const listFlashCards = await ListsFlashCards.findById(id)
            const author_id = await ListsFlashCards.findOne({ author_id: req.userId})

            if(!author_id) {
                return res.status(403).json({
                    message: 'You are not the author, so you cannot edit!',
                })
            }
    
            if (!listFlashCards) {
                return res.status(500).json({
                    message: 'ListFlashCards not found!'
                })
            }
    
            await listFlashCards.restore()
    
            await Flashcards.updateMany(
                { id_list_flashcards: id },
                { $set: { deleted: false, deletedAt: null } }
            )
    
            res.status(200).json({
                message: 'Restore successfully!'
            })
        } catch (error) {
            next(error)
        }
    }

    // [POST] /card/set-cards
    async addSetCards(req, res, next) {
        try {
            const { setCards, listCardsId } = await req.body
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

    // [POST] /card/flashcard
    async addFlashCard(req, res, next) {
        try {
            const { reverse_side, face_side, id_list_flashcards } = await req.body
            const listsFlashcards = await ListsFlashCards.findById({ _id: id_list_flashcards })
            const author_id = await ListsFlashCards.findOne({ author_id: req.userId})

            if(!author_id) {
                return res.status(403).json({
                    message: 'You are not the author, so you cannot edit!',
                })
            }

            if (!listsFlashcards) {
                return res.status(500).json({
                    message: 'Not found!',
                })
            }

            const card = new Flashcards({
                id_list_flashcards,
                reverse_side,
                face_side,
            })

            await card.save()
            .then(result => {
                res.status(200).json({
                    message: 'Created successfully!',
                    result
                })
            })
            .catch(error => {
                next(error)
            })

        } catch (error) {
            next(err)
        }
    }

    // [PATCH] /card/flashcard
    async updateFlashcard(req, res, next) {
        const { reverse_side, face_side, id } = await req.body
        const author_id = await ListsFlashCards.findOne({ author_id: req.userId})

        if(!author_id) {
            return res.status(403).json({
                message: 'You are not the author, so you cannot edit!',
            })
        }

        await Flashcards.findByIdAndUpdate({ _id: id }, { reverse_side, face_side })
        .then(result => {
            res.status(200).json({
                message: 'Update successfully!',
                result
            })
        })
        .catch(err => {
            next(err)
        })

    }
    
    // [DELETE] /card/flashcard 
    async deleteFlashcard(req, res, next) {
        const { id } = await req.query
        const author_id = await ListsFlashCards.findOne({ author_id: req.userId})

        if(!author_id) {
            return res.status(403).json({
                message: 'You are not the author, so you cannot delete!',
            })
        }

        await Flashcards.findByIdAndDelete({ _id: id })
        .then(result => {
            res.status(200).json({
                message: 'Delete successfully!'
            })
        })
        .catch(err => {
            next(err)
        })

    }

    // [GET] /card/study
    async studySetCards(req, res, next) {
        try {
            const { id } = await req.query
            
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
                topic: listFlashCards.topic,
                type: listFlashCards.type,
                setCards: flashcards
            })
        } catch (error) {
            next(error)
        }
    }

    // [GET] /card/flashcards-personal
    async getFlashPersonal(req, res, next) {
        try {
            const userId = req.userId
            
            await ListsFlashCards.find({ author_id: userId }, { $or: [{ deleted: { $exists: false } }, { deleted: false }] })
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
        } catch (error) {
            next(error)
        }
    }
      

}

module.exports = new CardControllers


