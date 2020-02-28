const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieCommentSchema = new Schema({
    username: {type: String, required: true},
    title: {type: String, required: true},
    comment: {type: String, required: true},
    date: {type: Date, required: true}
}, {
    timestamps: true,
});

const Movie_Comment = mongoose.model('Movie_Comment', movieCommentSchema);

module.exports = Movie_Comment;