const express = require('express')
const router = express.Router()

const authenticated = require('../middlewares/authenticated')
const flashCardController = require('../controllers/CardController')

router.get('/lists-flashcards', flashCardController.getAllListFlashcards)
router.post('/list-flashcards', authenticated, flashCardController.addListFlashCards)
router.post('/set-cards', authenticated, flashCardController.addSetCards)
router.get('/list-set-cards', flashCardController.getAllSetCards)

module.exports = router