const express = require('express');
const app = express();
require('./config/dataBase');

const userRoutes = require('./routes/userRoute');
const checkAuth = require('./middleware/checkAuth')

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    );
    next();
});

app.use('/api/user', userRoutes);

app.get('/', checkAuth, (req, res, next) => {
    res.status(201).send({ message: 'Hello World' });
});

module.exports = app;
