const mongoose = require('mongoose');
const { MONGOURL } = require('../config');

mongoose.connect(MONGOURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to Mongodb');
});

mongoose.connection.on('error', (error) => {
    console.log('Database connection error!', error);
});