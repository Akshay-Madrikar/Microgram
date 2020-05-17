const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');

const userSchema  = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});


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

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
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
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;