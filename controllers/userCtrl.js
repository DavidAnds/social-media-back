const User = require('../models/userModel');

exports.modifyBio = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then((user) => {
            if (!user) {
                res.status(404).json({ error: 'Utilisateur inexistant' });
            }
            if (req.params.id !== req.auth.userId) {
                res.status(400).json({
                    error: 'Requete non authorisé',
                });
            }
            User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: { bio: req.body.bio } }
            )
                .then(() =>
                    res.status(200).json({
                        message: 'Bio modifiée',
                    })
                )
                .catch(() => res.status(400).json({ error }));
        })
        .catch((error) => res.status(400).json({ error }));
};

exports.deleteUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then((user) => {
            if (!user) {
                res.status(404).json({ error: 'Utilisateur inexistant' });
            }
            if (req.params.id !== req.auth.userId) {
                res.status(400).json({
                    error: 'Requete non authorisé',
                });
            }
            User.deleteOne({ _id: req.params.id })
                .then(() =>
                    res.status(200).json({
                        message: 'Utilisateur supprimé',
                    })
                )
                .catch(() => res.status(400).json({ error }));
        })
        .catch((error) => res.status(400).json({ error }));
};

exports.showUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .select('-password -_id')
        .then((user) => res.status(200).json({ user }))
        .catch((error) => res.status(400).json({ error }));
};

exports.showAllUser = (req, res, next) => {
    User.find()
        .select('-password -_id')
        .then((users) => res.status(200).json({ users }))
        .catch((error) => res.status(400).json({ error }));
};
