const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const FlashcardsSchema = new Schema({
    id_list_flashcards: { type: Schema.Types.ObjectId },
    reverse_side: { type: String, required: true },
    face_side: { type: String, required: true },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
}, {
    timestamps: true
})

FlashcardsSchema.methods.restore = async function () {
    this.deleted = false
    this.deletedAt = null
    await this.save()
}

const Flashcards = mongoose.model('Flashcards', FlashcardsSchema)

module.exports = Flashcards

