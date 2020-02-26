const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieUserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
}, {
    timestamps: true,
});

const Movie_User = mongoose.model('Movie_User', movieUserSchema);

module.exports = Movie_User;