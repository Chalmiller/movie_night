const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const schema = require('./schema');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();

// Local dev
//  const port = process.env.PORT || 5000;

// Heroku deployment
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

// Local development
// const uri = process.env.ATLAS_URI;
// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log('MongoDB database connection established successfully');
// }).catch(error => console.log(error));

// Heroku Deployment
mongoose.connect(process.env.MONGODB_URI || uri);

const moviesRouter = require('./backend/routes/movie');
const usersRouter = require('./backend/routes/movie_user');
const commentRouter = require('./backend/routes/movie_comment');


app.use('/movies', moviesRouter);
app.use('/users', usersRouter);
app.use('/comments', commentRouter);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', "build", "index.html"));
    });
} 

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});