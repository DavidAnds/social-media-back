const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

mongoose
    .connect(
        'mongodb+srv://david:david@cluster0.443t2.mongodb.net/mySocialMediaDB?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((err) => console.log('Connexion à MongoDB échouée !', err));
