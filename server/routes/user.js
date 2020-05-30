const express = require('express');
const User = require('../models/user');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to Microgram!');
});

//----------- SIGN UP -------------//
router.post('/signup', async (req, res) => {
    const{ username, email, password, pic }= req.body;
    if(!username || !email || !password){
      return res.status(400).json({
            error: "Please provide all details!"
        });
    };

    const user = new User({ username, email, password, pic });
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
        const { _id, username, email, pic, followers, following } = user;
        res.status(202).json({
            user: { _id, email, username, pic, followers, following },
            token,
            message: "Successfull login"
        });
    } catch(error) {
        res.status(400).send({error: 'Email or password incorrect!'});
    };
});

//----------- UPDATE PROFILE PIC -------------//
router.put('/updatePicture', auth, async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.user._id, {
            $set: {
                pic: req.body.pic
            }
        }, {
            new: true
        })
        res.status(200).json(user);
    } catch(error) {
        res.status(400).send({error: 'Email or password incorrect!'});
    }
});
module.exports = router;