const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const absences = require('./routes/api/absences');
const filter = require('./routes/api/filter');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
var cors = require('cors')

const app = express();

app.use(cors())
// For JSON Parsing 
app.use(express.json());

require('./config/passport')(passport);


// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose.connect(db)
    .then(() => console.log('\nMongoDB Connected...'))
    .catch(err => console.log(err));


//app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Use routes
app.use('/api/users', users);
app.use('/api/absences', absences);
app.use('/api/filter', filter);


if (process.env.NODE_ENV === "production") {
    // Express will serve up production assets
    app.use(express.static("build"));
    app.get("*", (req, res) => res.sendFile(path.resolve("build", "index.html")));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`\nServer started on port ${port}`));

