const jwt = require('jsonwebtoken');

const { StatusCodes } = require('http-status-codes');

const checkAuthUser = async (req, res, next) => {
    try {
        const tokenData = req.headers.authorization;
        if (!tokenData) {
            return res.status(401).json({ error: 'Missing authorization header' });
        }
        const checkAuth = jwt.verify(tokenData.split(' ')[1], process.env.SECRET_KEY);
        console.log(checkAuth);
        if (checkAuth) {
            console.log("verified");
            req.user = checkAuth;
            next();
        }
        else {
            return res.send({ message: "Authentitcation failed" });
        }
    }
    catch (err) {
        console.log(err);
        return res.send({ message: "error" })
    }
}

module.exports = checkAuthUser;