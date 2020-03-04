const router = require('express').Router();
let Movie = require('../models/movie.model');

router.route('/').get((req, res) => {
    Movie.find()
    .then(movie => res.json(movie))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const newMovie = new Movie(req.body);

    newMovie.save()
    .then(() => res.json('Movie added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Movie.findById(req.params.id)
    .then(movie => res.json(movie))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Movie.findByIdAndDelete(req.params.id)
    .then(() => res.json('Movie deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Movie.findById(req.params.id)
        .then(movie => {
            movie.username = req.body.username;
            movie.title = req.body.title;
            movie.description = req.body.description;
            movie.genre = req.body.genre;
            movie.poster = req.body.poster;
            movie.date = new Date(req.body.date);
            movie.save()
            .then(() => res.json('Movie updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/comment/:id').post((req, res) => {
    Movie.findById(req.params.id)
        .then(movie => {
            movie.update({ $push: { comment: { title: req.body.comment.title, comments: req.body.comment.comments} } })
            .then(() => {
                res.json('Movie updated!')})
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
