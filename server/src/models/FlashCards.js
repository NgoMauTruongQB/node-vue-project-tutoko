const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const FlashcardsSchema = new Schema({
    Id_list_flashcards: { type: Schema.Types.ObjectId },
    Image: { type: String },
    Reverse_side: { type: String, required: true },
    Face_side: { type: String, required: true },
}, {
    timestamps: true
})

const Flashcards = mongoose.model('Flashcards', FlashcardsSchema)

module.exports = Flashcards

