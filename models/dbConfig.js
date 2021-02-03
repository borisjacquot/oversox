const mongoose = require('mongoose');
require('dotenv').config();

mongoose
    .connect('mongodb+srv://' + process.env.DB_USER +':' + process.env.DB_PASS + '@oversox.ixrcl.mongodb.net/oversox',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Failed to connect to MongoDB', err));