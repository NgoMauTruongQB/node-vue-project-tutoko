const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const BlogPostsSchema = new Schema({
    cover_url: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: Object, required: true },
    author_id: { type: Schema.Types.ObjectId, required: true },
},{
    timestamps: true
})

const BlogPosts = mongoose.model('BlogPosts', BlogPostsSchema)

module.exports = BlogPosts

