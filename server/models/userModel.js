const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        truncate: true
    },
    password: {
        type: String,
        required: true
    },
    courses:{
        type:[mongoose.Types.ObjectId],
        ref:'course'
    }
})

const User = mongoose.model('user', userSchema);
module.exports = User;