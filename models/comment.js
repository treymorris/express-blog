var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema(
    {
        comment: { type: String, required: true },
        date: { type: Date, default: Date.now},
        username: { type: String, required: true }
    }
);

module.exports = mongoose.model('Comment', CommentSchema);