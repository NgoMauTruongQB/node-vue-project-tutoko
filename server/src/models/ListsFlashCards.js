const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const ListsFlashcardsSchema = new Schema({
    topic: { type: String, required: true },
    type: { type: String, required: true, enum: [ 'vocabulary', 'kanji', 'grammar' ] },
    author_id: { type: Schema.Types.ObjectId, required: true },
}, {
    timestamps: true,
})

const ListsFlashcards = mongoose.model('ListsFlashcards', ListsFlashcardsSchema)

module.exports = ListsFlashcards

