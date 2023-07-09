const router = require('express').Router();
const bcrypt = require('bcrypt');
const Admin = require('../models/adminModels');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
router.post('/admin/signup', async (req, res) => {
    try {
        const userData = req.body;
        const checkUser = await Admin.findOne({ email: userData.email });
        if (!checkUser) {
            const passwordHash = await bcrypt.hash(userData.password, 10);
            const newUser = new Admin({ ...userData, password: passwordHash });
            await newUser.save();
            return res.status(201).send({ message: "Admin accound created successfully" });
        }
        return res.send({ message: "User already exists" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ message: "error occured" });
    }
});

router.post('/admin/login', async (req, res) => {
    try {
        const userData = req.body;
        const checkUser = await Admin.findOne({ email: userData.email });
        if (!checkUser) {
            return res.status(StatusCodes.FORBIDDEN).send({ message: "user not registerd" });
        }
        const checkAuth = await bcrypt.compare(userData.password, checkUser.password);
        if (checkAuth) {
            const token = jwt.sign({ _id: checkUser._id, email: checkUser.email }, process.env.SECRET_KEY);
            return res.status(StatusCodes.OK).send({
                message: "Admin Logged in successfully",
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

module.exports = router;