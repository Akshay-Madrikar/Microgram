const express = require('express');
const User = require('../models/user');
const Post = require('../models/post');
const auth = require('../middlewares/auth');

const router = express.Router();

//--------- PROFILE ------------//
router.get('/user/:userId', auth, async (req, res) => {
    try{
        // getting user without password field
        const user = await User.findOne({ _id: req.params.userId }).select('-password');
        const posts = await Post.find({ postedBy: req.params.userId }).populate('postedBy').exec();

        res.status(200).json({ 
            user,
            posts
         });
    } catch(error) {
        res.status(400).json({error});
    }
});


//----------- FOLLOW -------------//
router.put('/follow', auth , (req, res) => {
    try{
        User.findByIdAndUpdate( req.body.followId, {
            $push: { followers: req.user._id }
        }, {
            new: true
        }, async () => {
          const result = await User.findByIdAndUpdate( req.user._id, {
                $push: { following: req.body.followId }
            }, {
                new: true
            }).select('-password');

            res.status(200).json(result);
        });
    } catch(error) {
        res.status(400).json({error});
    }
});

//----------- UNFOLLOW -------------//
router.put('/unfollow', auth , (req, res) => {
    try{
        User.findByIdAndUpdate( req.body.unfollowId, {
            $pull: { followers: req.user._id }
        }, {
            new: true
        }, async() => {
            const result = await User.findByIdAndUpdate( req.user._id, {
                 $pull: { following: req.body.unfollowId }
             }, {
                 new: true
             }).select('-password');
             
             res.status(200).json(result);
         });
    } catch(error) {
        res.status(400).json({error});
    }
});

//----------- SEARCH USERS -------------//
router.post('/search-users', async(req, res) => {
    try{
        let userPattern = new RegExp("^"+req.body.query); 
        const user = await User.find({
            username: {
                $regex: userPattern
            }
        }).select('_id username');
    
        res.status(200).json({user});
    } catch(error) {
        res.status(400).json({error});
    }
});

module.exports = router;