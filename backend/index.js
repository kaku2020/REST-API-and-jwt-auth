const express = require('express');
const mongoose = require('mongoose');
const useRouter = require('./router/userRoutes.js')
const bodyParser = require('body-parser');
const dotenv = require("dotenv");

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB', error);
  });


app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(useRouter);


app.listen(7000, () => {
  console.log('Server started on port 7000');
});