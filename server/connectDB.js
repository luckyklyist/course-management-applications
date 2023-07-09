const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("db connected ")
    }
    catch (err) {
        console.log("errro connecting to the db.")
        console.log(err);
    }
}

module.exports = connectDB;