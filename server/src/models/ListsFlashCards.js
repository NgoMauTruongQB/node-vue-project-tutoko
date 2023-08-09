const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const ListsFlashcardsSchema = new Schema({
    topic: { type: String, required: true },
    type: { type: String, required: true, enum: [ 'vocabulary', 'kanji', 'grammar' ] },
    author_id: { type: Schema.Types.ObjectId, required: true },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
}, {
    timestamps: true,
})

ListsFlashcardsSchema.methods.restore = async function () {
    this.deleted = false
    this.deletedAt = null
    await this.save()
}

const ListsFlashcards = mongoose.model('ListsFlashcards', ListsFlashcardsSchema)

module.exports = ListsFlashcards

