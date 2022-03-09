const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: {
        type: String,
        ref: 'user',
        rquired: true,
    },
    message: {
        type: String,
        maxlenght: 500,
    },
    picture: {
        type: String,
    },
    likers: {
        type: [String],
        rquired: true,
    },
    comments: {
        type: [
            {
                commentorId: {
                    type: String,
                    ref: 'user',
                    rquired: true,
                },
                message: {
                    type: String,
                    maxlenght: 400,
                },
            },
        ],
    },
});

module.exports = mongoose.model('post', postSchema);
