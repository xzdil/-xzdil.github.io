const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String
        ,default: ''
    },
    developer:{
        type: String
        ,default: ''
    },
    publisher:{
        type: String
        ,default: ''
    },
    release:{
        type: String
        ,default: ''
    },
    description:{
        type: String
        ,default: ''
    },
    platforms: {
        type: String
        ,default: ''
    },
    com:{
        type: Array
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;
