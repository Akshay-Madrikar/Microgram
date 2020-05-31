const express = require('express');
const User = require('../models/user');
const auth = require('../middlewares/auth');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');
const { SEND_GRID_API, EMAIL } = require('../config/config');

const router = express.Router();

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: SEND_GRID_API
    }
}));

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
       
       transporter.sendMail({
           to: user.email,
           from: 'no-reply@microgram.com',
           subject: 'Sign-up success',
           html: `<h1>Welcome ${user.username} to Microgram!</h1> </br>
                  <h4>We're happy to serve you :)</h4>`
       });

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
        const user = await User.findByCredentials( req.body.username, req.body.password );
        const token = await user.generateAuthToken();
        const { _id, username, email, pic, followers, following } = user;
        res.status(202).json({
            user: { _id, email, username, pic, followers, following },
            token,
            message: "Successfull login"
        });
    } catch(error) {
        res.status(400).send({error: 'Username or password incorrect!'});
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

//----------- RESET PASSWORD -------------//
router.post('/reset-password', async (req, res) => {
    crypto.randomBytes(32, async (error, buffer) => {
        if(error){
            console.log(error);
        };

        const token = buffer.toString('hex');
        
        try{
            const user = await User.findOne({ email: req.body.email })
            if(!user) {
                return res.status(400).json({error: 'No user exists with that email!'});
            }
            user.resetToken = token;
            user.expireToken = Date.now() + 3600000;
            await user.save();
    
            transporter.sendMail({
                to: user.email,
                from: 'no-reply@microgram.com',
                subject: 'Reset password',
                html: `<p>Hello ${user.username}, you've requested to reset your password</p> </br>
                      <h4>Click on this <a href="${EMAIL}/reset-password/${token}">link</a> to reset your password</h4>`
            });
    
            res.status(200).json({
                message: 'Check your email!'
            });
        } catch(error) {
            res.status(400).json({error});
        }
    });
});

//----------- SET NEW PASSWORD -------------//
router.post('/new-password', async (req, res) => {
    try{
        const newPassword = req.body.password;
        const sentToken = req.body.token;
    
        const user = await User.findOne({
            resetToken: sentToken,
            expireToken: {
                $gt: Date.now()
            }
        });
        if(!user) {
            return res.status(400).json({error: 'Session expired!'});
        }

        // No need to hash, as in model I've written the code for hashing before save()
        user.password = newPassword;
        user.resetToken = undefined;
        user.expireToken = undefined;

        await user.save();
        res.status(201).json({
            message: 'Password updated successfully!'
        });
    } catch(error) {
        res.status(400).json({error});
    }
});

module.exports = router;