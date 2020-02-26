const router = require('express').Router();
let Movie = require('../models/movie.model');

router.route('/').get((req, res) => {
    Movie.find()
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const genre = Number(req.body.genre);
    const date = Date.parse(req.body.date);

    const newMovie = new Movie({
        username,
        description,
        genre,
        date
    });

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
            movie.description = req.body.description;
            movie.genre = req.body.genre;
            movie.date = new Date(req.body.date);

            movie.save()
            .then(() => res.json('Movie updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;