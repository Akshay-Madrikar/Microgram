const express = require('express');
//const cors = require('cors');
require('./db/mongoose');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const userProfile = require('./routes/userProfile');

const app = express();

//app.use(cors());
app.use(express.json());
app.use(userRouter, postRouter, userProfile);

const port = process.env.PORT || 5000;

// To run on production
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(_dirname,'client','build','index.html'));
    })
};

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});