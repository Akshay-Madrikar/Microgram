const express = require('express');
require('./db/mongoose');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

const app = express();

app.use(express.json());
app.use(userRouter, postRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});