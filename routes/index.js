const express = require('express');
const router = express.Router();
const User = require('../models/User');
var assert = require('assert');


const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

var absenceList = [{reason:"sick", startDate:"01/01/1901", endDate:"02/02/2020"}]

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res, next) =>{
  console.log("going to dashboard");
  res.render('dashboard', {
    user: req.user,
    absences: req.user.absences,
    currentabsence: req.user.currentabsence,
    absenceList: absenceList
  })}
);

router.post('/dashboard', (req, res) => {
  const reason = req.body.leavereason;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const newAbsence = {reason:reason, startDate:startDate, endDate:endDate};
  absenceList.push(newAbsence);
  console.log("dashboard posting");
  res.render('dashboard', {
    user: req.user,
    absences: req.user.absences,
    currentabsence: req.user.currentabsence,
    absenceList: absenceList
  })
}
);

// Admin Dashboard
// router.get('/admindashboard', ensureAuthenticated, (req, res, next) => {
//   var dataArray = [];
//   var cursor = User.find();
//   cursor.forEach(function(doc, err) {
//     assert.equals(null, err);
//     dataArray.push(doc);
//   }, function() {
//     res.render('/admindashboard', {
//       userData: dataArray
//     });
//   });
// });

router.get('/admindashboard', ensureAuthenticated, (req, res, next) =>
  res.render('admindashboard', {
    user: req.user,
    userData: User.find().cursor()
  })
);



// Create Absence
router.get('/createabsence', (req, res, next) =>
  res.render('/createabsence', {
    user: req.user
  })
);






module.exports = router;
