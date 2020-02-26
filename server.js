const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
}).catch(error => console.log(error));

const exercisesRouter = require('./backend/routes/exercise');
const usersRouter = require('./backend/routes/users');
const nutritionRouter = require('./backend/routes/nutrition');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/nutrition', nutritionRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});