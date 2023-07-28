const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const UsersInformationSchema = new Schema({
    User_id: { type: Schema.Types.ObjectId, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    status_caption: { type: String },
    avatar: { type: String },
})

const UsersInformation = mongoose.model('UsersInformation', UsersInformationSchema);

module.exports = UsersInformation
