const User = require('../models/userModel');
const Post = require('../models/postModel');

exports.likePost = (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (!post) {
                res.status(404).json({ error: 'post introuvable' });
            }
            const test = post.likers.includes(req.body.userId);
            if (test) {
                res.status(400).json({ error: 'deja liker' });
            }
            Post.updateOne(
                { _id: req.params.id },
                { $addToSet: { likers: req.body.userId } }
            )
                .then(() =>
                    User.updateOne(
                        { _id: req.body.userId },
                        { $addToSet: { likes: req.params.id } }
                    )
                        .then(() =>
                            res.status(200).json({ message: 'Post liker' })
                        )
                        .catch(() =>
                            res.status(400).json({ error: 'erreur dans User' })
                        )
                )
                .catch(() =>
                    res.status(400).json({ error: 'erreur dans Post' })
                );
        })
        .catch(() => res.status(400).json({ error: 'erreur dans Find post' }));
};

exports.dislikePost = (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (!post) {
                res.status(404).json({ error: 'post introuvable' });
            }
            const test = !post.likers.includes(req.body.userId);
            if (test) {
                res.status(400).json({ error: 'Post non liker' });
            }
            Post.updateOne(
                { _id: req.params.id },
                { $pullAll: { likers: [req.body.userId] } }
            )
                .then(() =>
                    User.updateOne(
                        { _id: req.body.userId },
                        { $pullAll: { likes: [req.params.id] } }
                    )
                        .then(() =>
                            res.status(200).json({ message: 'like supprimé' })
                        )
                        .catch(() =>
                            res.status(400).json({ error: 'erreur dans User' })
                        )
                )
                .catch(() =>
                    res.status(400).json({ error: 'erreur dans Post' })
                );
        })
        .catch(() => res.status(400).json({ error: 'erreur dans Find post' }));
};
