const express = require('express');
const Post = require('../models/post');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/createpost', auth, async (req, res) => {
    const { title, body } = req.body;
    if(!title || !body) {
        return res.status(400).json({
            error: "Please provide all details!"
        });
    };
    
    const post = new Post({
        title,
        body,
        postedBy: req.user
    });

    try{
        await post.save();
        res.status(201).send(
            post
        );
    } catch(error) {
        res.status(400).send(error);
    };
});

router.get('/posts', async (req, res) => {
    try{
       const posts = await Post.find({}).populate('postedBy');
       res.status(200).json({
           posts
       })
    } catch(error) {
        res.status(400).send(error);
    };
});

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