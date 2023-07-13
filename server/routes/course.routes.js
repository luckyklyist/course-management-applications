const router = require('express').Router();
const { StatusCodes } = require('http-status-codes');
const Course = require('../models/courseModels');
const checkAuthAdmin = require('../middleware/checkAuth');


router.post('/admin/courses', checkAuthAdmin, async (req, res) => {
    try {
        const courseData = req.body;
        const newCourse = new Course(courseData);
        await newCourse.save();
        return res.status(StatusCodes.CREATED).send({ message: "Course created successfully", courseId: newCourse._id });
    }
    catch (err) {
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Error" })
    }
});

router.put('/admin/courses/:courseId', checkAuthAdmin, async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const courseData = req.body;
        const checkCourse = await Course.findOne({ _id: courseId });
        if (checkCourse) {
            const updateCourse = await Course.updateOne({ _id: courseId }, courseData);
            const course=await Course.findOne({_id:courseId})
            return res.send({ message: "Course updated",course })
        }
        return res.send({ message: "Course not found" })
    }
    catch (err) {
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Error" })
    }
});

router.get('/admin/courses', async (req, res) => {
    try {
        const courses = await Course.find();
        return res.send({courses});
    }
    catch (err) {
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Error" })
    }
});

module.exports = router;