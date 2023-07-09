const express = require('express');

const router = express.Router();
const authRoutes = require('./auth.routes');
const courseRoutes = require('./course.routes');
const userRoutes=require('./user.routes');

router.get('/healthcheck', (_, res) => res.send({ message: "server is running" }))

router.use(authRoutes);
router.use(courseRoutes);
router.use(userRoutes);

module.exports = router;
