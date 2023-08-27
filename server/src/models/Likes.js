const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const LikesSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, required: true },
    post_id: { type: Schema.Types.ObjectId, required: true },
})

const Likes = mongoose.model('Likes', LikesSchema)

module.exports = Likes



