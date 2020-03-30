const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

// Admin Dashboard
router.get('/admindashboard', ensureAuthenticated, (req, res) =>
  res.render('admindashboard', {
    user: req.user
  })
);

// router.get(
//   '/admin-dashboard',
//   passport.authenticate('jwt', { failureRedirect: '/login' }),
//   User.admin,
//   (req, res) => {
//     return handle(req, res)
//   }
// )
module.exports = router;
