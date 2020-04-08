const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const absences = require('./routes/api/absences');

const app = express();

// For JSON Parsing 
app.use(express.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose.connect(db)
    .then(() => console.log('\nMongoDB Connected...'))
    .catch(err => console.log(err));

// Use routes
app.use('/api/users', users);
app.use('/api/absences', absences);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`\nServer started on port ${port}`));

