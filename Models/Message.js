const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    name: {   type: String},
    toName: { type: String},
    text:{    type: String},
    date: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
