const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
module.exports = function(passport) {
  
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      console.log("authentication started");
      // Match user
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          console.log('USER Does not exist')
          return done(null, false, { message: 'That email is not registered' });
        }

        console.log("USER user has been found");

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    console.log("user serialized");
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    console.log("user being deserialized");
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};