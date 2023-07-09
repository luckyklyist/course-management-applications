const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const checkAuthUser = require('../middleware/checkUser');
const Course = require('../models/courseModels');
router.post('/user/signup', async (req, res) => {
    try {
        const userData = req.body;
        const checkUser = await User.findOne({ email: userData.email });
        if (!checkUser) {
            const passwordHash = await bcrypt.hash(userData.password, 10);
            const newUser = new User({ ...userData, password: passwordHash });
            await newUser.save();
            return res.status(201).send({ message: "User account created successfully" });
        }
        return res.send({ message: "User already exists" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ message: "error occured" });
    }
});

router.post('/user/login', async (req, res) => {
    try {
        const userData = req.body;
        const checkUser = await User.findOne({ email: userData.email });
        if (!checkUser) {
            return res.status(StatusCodes.FORBIDDEN).send({ message: "user not registerd" });
        }
        const checkAuth = await bcrypt.compare(userData.password, checkUser.password);
        if (checkAuth) {
            const token = jwt.sign({ _id: checkUser._id, email: checkUser.email }, process.env.SECRET_KEY);
            return res.status(StatusCodes.OK).send({
                message: "User Logged in successfully",
                token
            })
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).send({ message: "Email or password dont matched" })
        }
    }
    catch (err) {
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Error loggging in" })
    }
});

router.get('/users/courses', checkAuthUser, async (req, res) => {
    try {
        const courses = await Course.find({ published: true });
        return res.send({ courses });
    }
    catch (err) {
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Error loggging in" })
    }
});

// buy the course
router.post('/users/courses/:courseId', checkAuthUser, async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const checkCourse = await Course.findOne({ _id: courseId, published: true });
        if (checkCourse) {
            const buyCourse = await User.updateOne({ _id: req.user._id }, { courses: checkCourse })
            return res.send({ message: "Course purchased" })
        }
        return res.send({ message: "Course not availabel" });
    }
    catch (err) {
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Error loggging in" })
    }
});

router.get('/users/purchasedCourses', checkAuthUser, async (req, res) => {
    try {
        const allPurchasedCourse=await User.findOne({_id:req.user._id})
        return res.send({allPurchasedCourse})
    }
    catch (err) {
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Error loggging in" })
    }
});



module.exports = router;