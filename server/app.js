const express = require('express');
const cors = require('cors');
require('./db/mongoose');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouter, postRouter);

const port = 5000;

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});