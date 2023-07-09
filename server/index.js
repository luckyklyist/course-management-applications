const express = require('express');
const connectDB = require('./connectDB');
require('dotenv').config();
const router=require('./routes/index.routes');
const bodyParser=require('body-parser');

const app = express();
const PORT=process.env.PORT;

app.use(express.json());
app.use(bodyParser());

app.use('/api/v1',router);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  connectDB();
});
