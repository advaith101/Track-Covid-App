const express = require('express');
const router = express.Router();

// User Model
const User = require('../../models/User');

// @route   GET api/users
// @desc    Get a user using email (email serves as a user id)
// @access  Public
router.get('/', (req, res) => {
    User.find({ email: req.body.email })    
        .then(user => res.json(user))
        .catch(err => console.log('User not found. Error:' + err));
});

// @route   GET api/users
// @desc    Update a user's password
// @access  Public
router.put('/', (req, res) => {
    User.findAndModify({
        query: { "email" : req.body.email },
        update: { "password": req.body.password }
    });
})

// @route   POST api/users
// @desc    Create a user
// @access  Public
router.post('/create', (req, res) => {
    const newUser = new User({
       name: req.body.name,
       email: req.body.email,
       password: req.body.password,
       date: req.body.date,
       admin: req.body.admin,
    });

    newUser.save().then(user => res.json(user));
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

module.exports = router;