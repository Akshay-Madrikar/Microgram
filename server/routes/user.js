const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to Microgram!');
});

//----------- SIGN UP -------------//
router.post('/signup', async (req, res) => {
    const{ username, email, password }= req.body;
    if(!username || !email || !password){
      return res.status(400).json({
            error: "Please provide all details!"
        });
    };

    const user = new User({ username, email, password });
    try{
        const savedUser = await User.findByEmailAddress(email);
        if(savedUser){
            return res.status(400).json({
                error: "User already exists with that email address!!!"
            });
        }
       await user.save();
       const token = await user.generateAuthToken();
       res.status(201).json({
           user,
           token,
           message: "User signup successfull"
       });
    } catch (error) {
        res.status(400).send(error);
    };
});

//----------- SIGN IN -------------//
router.post('/signin',async (req, res) => {
    try{
        const user = await User.findByCredentials( req.body.email, req.body.password );
        const token = await user.generateAuthToken();
        res.status(202).json({
            user,
            token,
            message: "Successfull login"
        });
    } catch(error) {
        res.status(400).send({error: 'Email or password incorrect!'});
    };
});

module.exports = router;