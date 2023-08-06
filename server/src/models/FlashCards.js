const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const FlashcardsSchema = new Schema({
    id_list_flashcards: { type: Schema.Types.ObjectId },
    reverse_side: { type: String, required: true },
    face_side: { type: String, required: true },
}, {
    timestamps: true
})

const Flashcards = mongoose.model('Flashcards', FlashcardsSchema)

module.exports = Flashcards

