const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default:'...'
    },
    game: {
        type: String
    },
    age: {
        type: Number
    },
    avatar: {
        type: String
    },
    role:{
        type: Number,
        default: 0
    },
    city: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;
