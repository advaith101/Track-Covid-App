const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
module.exports = function(passport) {
  
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      console.log("USER MATCHED");
      // Match user
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        console.log("USER MATCHED");

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
    console.log("USER MATCHED");
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    console.log("USER MATCHED");
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};