const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// import Express, CORS & Mongoose

require('dotenv').config();
// configurates the .env file where envriomental vriables are stored

const app = express();
const port = process.env.PORT || 5000;
//creates the express server & assigns the port to 5000

app.use(cors());
app.use(express.json());
//the middleware to allow CORS & parse JSON

const uri = process.env.ATLAS_URI;
// assigns the env variable from the .env file to this const
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
});
//connects to the database
const connection = mongoose.connection;
connection.once('open', () => {
  console.log(
    'MongoDB Database connnection successfully established',
  );
});
//log to console when the connection is made

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
// imports the route pages to 2 variables to use below

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
// this directs the app to the route pages when the above routes are used

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
//starts the server
