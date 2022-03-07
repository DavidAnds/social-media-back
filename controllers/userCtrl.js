const User = require('../models/userModel');

exports.modifyBio = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then((user) => {
            const idUserFind = user._id
            const idFromAuthUser = req.auth.userId
            if (!user) {
                res.status(404).json({ error: 'Utilisateur inexistant' });
            }
            if (idUserFind !== idFromAuthUser) {
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
                        idUserFind,
                        idFromAuthUser,
                    })
                )
                .catch(() => res.status(400).json({ error }));
        })
        .catch((error) => res.status(400).json({ error }));
};

exports.showUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then((thing) => res.status(200).json({ thing }))
        .catch((error) => res.status(400).json({ error }));
};
