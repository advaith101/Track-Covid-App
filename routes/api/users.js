const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
//const passport = require('../../config/passport');
const passport = require('passport');
const { forwardAuthenticated } = require('../../config/auth');

// User Model
const User = require('../../models/user');
const Absence = require('../../models/absence');

// @route   POST api/users
// @desc    Get a user using email (email serves as a user id)
// @access  Public
router.post('/', (req, res) => {
    User.find({ email: req.body.email })    
        .then(user => res.json(user))
        .catch(err => console.log('User not found. Error:' + err));
});

// @route   GET api/users
// @desc    Update a user's password
// @access  Public
router.put('/', async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    //run bcrypt on req.body.password = newPassword
    //user.password = newPassword
    user.password = req.body.password;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) throw err;
          user.password = hash;
          user
            .save()
            .then(user => {  
              console.log('password successfully changed and encrypted...');
              res.json(user); //passing back user json to login
            })
            .catch(err => console.log(err));
        });
    });
});

// @route   POST api/users
// @desc    Create a user
// @access  Public
router.post('/create', (req, res) => {
    console.log('user create request recieved...')
    const newUser = new User({
       name: req.body.name,
       email: req.body.email,
       password: req.body.password,
       date: req.body.date,
       admin: req.body.admin,
       location: req.body.location,
       department: req.body.department
    });

    //encrypting password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {  
              console.log('password successfully encrypted...');
              res.json(user); //passing back user json to login
            })
            .catch(err => console.log(err));
        });
    });
    console.log('successfully created user!')


    
});

// @route   DELETE api/users
// @desc    Delete a user using email (email serves as a user id)
// @access  Public
router.delete('/', (req, res) => {
    User.deleteOne({ email: req.body.email })
        .then((val) => res.json({success: val.deletedCount}))
})

// @route   GET api/users/all
// @desc    Get all users
// @access  Public
router.get('/all', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => console.log('Users not found. Error:' + err));
});

// @route   POST api/users/login
// @desc    Aunthenticate user login attempt
// @access  Public
router.post(
    '/login',
    passport.authenticate('local', {
      failureRedirect: '/',
      failureFlash: true
    }), (req, res) => {

        console.log('login success');

        const userInfo = {
            name: req.user.name,
            email: req.user.email,
            admin: req.user.admin
        };
        console.log('user info', userInfo);

        res.json(userInfo);
    });


module.exports = router;