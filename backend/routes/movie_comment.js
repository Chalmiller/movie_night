const router = require('express').Router();
let Comment = require('../models/movie_comment.model');

router.route('/').get((req, res) => {
    Comment.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const title = req.body.title;
    const comment = req.body.comment;
    const date = Date.parse(req.body.date);

    const newComment = new Comment({
        username,
        title,
        comment,
        date
    });

    newComment.save()
    .then(() => res.json('Comment added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Comment.findById(req.params.id)
    .then(comment => res.json(comment))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Comment.findByIdAndDelete(req.params.id)
    .then(() => res.json('Comment deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Comment.findById(req.params.id)
        .then(comment => {
            comment.username = req.body.username;
            comment.title = req.body.title;
            comment.comment = req.body.comment;
            comment.date = new Date(req.body.date);

            comment.save()
            .then(() => res.json('Comments updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;