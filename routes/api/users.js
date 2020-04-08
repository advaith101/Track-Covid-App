const express = require('express');
const router = express.Router();

// User Model
const User = require('../../models/User');

// @route   GET api/user/all
// @desc    Get all users
// @access  Public
router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => console.log('Users not found. Error:' + err));
});

// @route   POST api/user/create
// @desc    Create a user
// @access  Public
router.post('/create', (req, res) => {
    const newUser = new User({
        // TODO: pass `req` into create user function
    });

    newUser.save().then(user => res.json(user));
});

// @route   GET api/user/:email
// @desc    Get a user using email (email serves as a user id)
// @access  Public
router.get('/:email', (req, res) => {
    User.find({ email: req.body.email })    
        .then(user => res.json(user))
        .catch(err => console.log('User not found. Error:' + err));
});


// @route   DELETE api/user/:email
// @desc    Delete a user using id (email serves as a user id)
// @access  Public
router.delete('/:email', (req, res) => {
    User.find({ email: req.body.email }) 
        .then(user => user.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
})

// @route   POST api/user/:email/:absence
// @desc    Add an absence for a user
// @access  Public
router.post('/:email/:absence', (req, res) => {
    // findUser.then(addAbsence)
})

// @route   POST api/user/:email/:absence_id/:updated_absence
// @desc    Add an absence for a user
// @access  Public
router.post('/:email/:absence_id/:updated_absence', (req, res) => {
    // find user then find absence then update it 
})

// @route   DELETE api/user/:email/:absence_id/
// @desc    Add an absence for a user
// @access  Public
router.delete('/:email/:absence_id', (req, res) => {
    // find user then find absence then delete it 
})

module.exports = router;