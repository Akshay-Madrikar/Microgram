const express = require('express');
const Post = require('../models/post');
const auth = require('../middlewares/auth');

const router = express.Router();


//------- CREATE POST ---------------//
router.post('/createpost', auth, async (req, res) => {
    const { title, body, pic } = req.body;
    if(!title || !body || !pic) {
        return res.status(400).json({
            error: "Please provide all details!"
        });
    };
    
    const post = new Post({
        title,
        body,
        photo: pic,
        postedBy: req.user
    });

    try{
        await post.save();
        res.status(201).json({
            post,
            message: 'Post created successfully'
        });
    } catch(error) {
        res.status(400).send(error);
    };
});

//--------- ALL POSTS ---------------//
router.get('/posts', auth, async (req, res) => {
    try{
       const posts = await Post.find({}).populate('postedBy');
       res.status(200).json({
           posts
       })
    } catch(error) {
        res.status(400).send(error);
    };
});

//------- PARTICULAR USER POSTS ---------------//
router.get('/mypost', auth, async (req, res) => {
    try{
        const myPost = await Post.find({ 
            postedBy: req.user._id 
        }).populate('postedBy');

        if(!myPost) {
            return res.status(404).send('No post available!')
        };

        res.status(200).json({
            myPost
        });
    } catch(error) {
        res.status(400).send(error);
    };
});

module.exports = router;