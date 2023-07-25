const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const UsersSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    status: { type: Boolean, required: true },
}, {
    timestamps: true,
})

const Users = mongoose.model('Users', UsersSchema)

module.exports = Users