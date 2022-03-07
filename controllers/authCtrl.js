const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../config/.env' });

exports.signIn = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                username: req.body.username,
                password: hash,
            });
            user.save()
                .then((doc) =>
                    res.status(201).send({ message: 'Utilisateur créé !', doc })
                )
                .catch((err) => res.status(400).send({ err }));
        })
        .catch((err) => res.status(500).json({ err }));
};

exports.signUp = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res
                    .status(401)
                    .json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then((result) => {
                    if (!result) {
                        return res
                            .status(401)
                            .json({ error: 'Mot de passe Incorrecte' });
                    }

                    res.status(201).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.SECRET_TOKEN,
                            {
                                expiresIn: '24h',
                            }
                        ),
                    });
                    console.log(req.header.authorization);
                })
                .catch((err) => res.status(500).json('pb bcrypt'));
        })
        .catch((err) => res.status(500).json({ err: 'pb find' }));
};
