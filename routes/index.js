const express = require('express');
const router = express.Router();
const User = require('../models/User');
var assert = require('assert');


const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res, next) =>
  res.render('dashboard', {
    user: req.user,
    absences: req.user.absences,
    currentabsence: req.user.currentabsence
  })
);

// Admin Dashboard
router.get('/admindashboard', ensureAuthenticated, (req, res, next) => {
  var dataArray = [];
  var cursor = User.find();
  cursor.forEach(function(doc, err) {
    assert.equals(null, err);
    dataArray.push(doc);
  }, function() {
    res.render('/admindashboard', {
      userData: dataArray
    });
  });
});

// router.get('/admindashboard', ensureAuthenticated, (req, res, next) =>
//   res.render('adminndashboard', {
//     user: req.user
//   })
// );

// router.get(
//   '/admin-dashboard',
//   passport.authenticate('jwt', { failureRedirect: '/login' }),
//   User.admin,
//   (req, res) => {
//     return handle(req, res)
//   }
// )
module.exports = router;
