const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        min: 10
    },
    price: {
        type: Number,
        required: true
    },
    imageLink: {
        type: String,
    },
    published: {
        type: Boolean,
        required: true,
        default: false
    }
})

const Course = mongoose.model("course", courseSchema);
module.exports = Course;