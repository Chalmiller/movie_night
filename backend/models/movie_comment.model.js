const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieCommentSchema = new Schema({
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

const movieCommentSchema = mongoose.model('Movie_Comment', movieCommentSchema);

module.exports = Movie_Comment;