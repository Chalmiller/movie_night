const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    username: {type: String, required: true},
    description: {type: String, required: true},
    genre: {type: Number, required: true},
    date: {type: Date, required: true}
}, {
    timestamps: true,
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;