const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');

const userSchema  = new mongoose.Schema({
    username:{
        type: String,
        trim: true,
        required: true
    },
    email:{
        type: String,
        trim: true,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Please enter proper email address!');
            }
        }
    },
    password:{
        type: String,
        trim: true,
        required: true,
        validate(value) {
            if(validator.contains(value.toLowerCase(),'password')){
                throw new Error('Your password must not contain password in it!');
            }
        }
    },
    pic: {
        type: String,
        default: 'https://res.cloudinary.com/dexkk3lc4/image/upload/v1590826851/default-profile-picture_y2bf4v.png'
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    resetToken: {
        type: String
    },
    expireToken: {
        type: Date
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'postedBy'
});

userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject()

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

userSchema.methods.generateAuthToken = async function() {
    const user = this;

    const token = jwt.sign({ _id: user._id.toString() }, JWT_SECRET);

    user.tokens = user.tokens.concat({ token });
    await user.save();
    
    return token;
};

userSchema.statics.findByEmailAddress = async (email) => {
    const user = await User.findOne({ email });
    return user;
};

userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username });
    if(!user) {
        throw new Error();
    };

    const isMatch = await bcryptjs.compare(password, user.password);
    if(!isMatch) {
        throw new Error();
    };

    return user;
};


// Hash the plain text password before saving
userSchema.pre('save', async function(next) {
    const user = this;

    if(user.isModified('password')) {
        user.password = await bcryptjs.hash(user.password, 8);
        console.log('Model : ' + user.passowrd)
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;