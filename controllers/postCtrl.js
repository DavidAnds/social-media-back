const Post = require('../models/postModel');

exports.createPost = (req, res) => {
    if (req.body.message || req.body.picture) {
        const post = new Post({
            ...req.body,
            userId: req.auth.userId,
        });
        post.save()
            .then((post) =>
                res.status(201).json({ message: 'post créer', post })
            )
            .catch((error) => res.status(400).json({ error }));
    } else {
        res.status(400).json({ error: 'Pas de contenu.' });
    }
};

exports.modifyPost = (req, res) => {
    if (req.body.message || req.body.picture) {
        Post.findOne({ _id: req.params.id }).then((post) => {
            if (!post) {
                res.status(404).json({ error: "Ce poste n'existe pas" });
            }
            if (post.userId !== req.auth.userId) {
                res.status(404).json({
                    error: "cette requête n'est pas autorisé",
                });
            }
            Post.updateOne(
                { _id: req.params.id },
                { ...req.body, userId: req.auth.userId, _id: req.params.id }
            )
                .then(() =>
                    res.status(200).json({
                        message: 'Contenu du post modifiée',
                    })
                )
                .catch(() => res.status(400).json({ error }));
        });
    } else {
        res.status(400).json({ error: 'Pas de contenu à modifier.' });
    }
};

exports.deletePost = (req, res) => {
    if (req.body.message || req.body.picture) {
        Post.findOne({ _id: req.params.id }).then((post) => {
            if (!post) {
                res.status(404).json({ error: "Ce poste n'existe pas" });
            }
            if (post.userId !== req.auth.userId) {
                res.status(404).json({
                    error: "cette requête n'est pas autorisé",
                });
            }
            Post.deleteOne({ _id: req.params.id })
                .then(() =>
                    res.status(200).json({
                        message: 'post supprimé',
                    })
                )
                .catch(() => res.status(400).json({ error }));
        });
    } else {
        res.status(400).json({ error: 'Pas de contenu à modifier.' });
    }
};

exports.showAllPost = (req, res) => {
    Post.find()
        .then((posts) => res.status(200).json({ posts }))
        .catch((error) => res.status(500).json({ error }));
};

exports.showPost = (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => res.status(200).json({ post }))
        .catch((error) => res.status(500).json({ error }));
};
