const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    title: {type: String, required: false},
    comments: {type: String, required: false}
})

const MovieSchema = new Schema({
    username: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    genre: {type: String, required: true},
    poster: {type: String, required: true},
    comment: {type: [commentSchema], required: false},
    date: {type: Date, required: true}
}, {
    timestamps: true,
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie