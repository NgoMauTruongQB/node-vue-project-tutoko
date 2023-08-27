const express = require('express')
const router = express.Router()

const authenticated = require('../middlewares/authenticated')
const flashCardController = require('../controllers/CardController')

router.get('/lists-flashcards', flashCardController.getAllListFlashcards)
router.post('/list-flashcards', authenticated, flashCardController.addListFlashCards)
router.post('/set-cards', authenticated, flashCardController.addSetCards)
router.get('/list-set-cards', flashCardController.getAllSetCards)
router.post('/flashcard', authenticated, flashCardController.addFlashCard)
router.patch('/flashcard', authenticated, flashCardController.updateFlashcard)
router.delete('/flashcard', authenticated, flashCardController.deleteFlashcard)
router.delete('/list-set-cards', authenticated, flashCardController.deleteSetCards)
router.get('/study', authenticated, flashCardController.studySetCards)
router.get('/flashcards-personal', authenticated, flashCardController.getFlashPersonal)

router.get('/trashed-setcards', authenticated, flashCardController.getTrashedSetCards)
router.put('/restore-setcards', authenticated, flashCardController.restoreSetCards)

module.exports = router