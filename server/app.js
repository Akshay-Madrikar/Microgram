const express = require('express');
const mongoose = require('mongoose');
const { MONGOURL } = require('./config');
const userRouter = require('./routes/user')

const app = express();

app.use(express.json());

app.use(userRouter);

const port = process.env.PORT || 3000;

mongoose.connect(MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to Mongodb');
});

mongoose.connection.on('error', (error) => {
    console.log('Database connection error!', error);
});

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});