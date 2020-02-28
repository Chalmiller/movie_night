const router = require('express').Router();
let Comment = require('../models/movie_comment.model');

router.route('/').get((req, res) => {
    Comment.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const comment = req.body.comment;
    const newComment = new Comment({comment});

    newComment.save()
    .then(() => res.json('Comment added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;