const express = require('express');
const router = express.Router();
const User = require('../models/User');
var assert = require('assert');


const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

var absenceList = [{name: "swaraj", reason:"sick", startDate:"01/01/1901", endDate:"02/02/2020"}];
var employeeList = [];
var queries = [];


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
  const name = req.body.name;
  const reason = req.body.leavereason;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const newAbsence = {name: name, reason:reason, startDate:startDate, endDate:endDate};
  absenceList.push(newAbsence);
  employeeList.push(newAbsence);
  console.log(employeeList.toString());
  console.log("dashboard posting");
  res.render('dashboard', {
    user: req.user,
    absences: req.user.absences,
    currentabsence: req.user.currentabsence,
    absenceList: absenceList
  })
}
);

// {/* <button onClick="sortByReason(button.text)" >Reason</button>
//       -> covid19
//       -> flu
//       <button onClick="sortByCovid(button.text)" >Reason</button>

//       function sortByCovid {
//         sortByReason("covid")
//       }
  
// function sortByReason(reason) {
//   newArray = employeeList // copy 
//   newArray.filter ($.name == reason);
//   // rerender 
//   delete class

// } */}

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
    userData: User.find().cursor(),
    employeeList: employeeList
  })
);



// Create Absence
// router.get('/createabsence', (req, res, next) =>
//   res.render('/createabsence', {
//     user: req.user
//   })
// );





  // 1. init query list []
  // 2. destructure post req 
  // 3. if desatructed not nil or whatever add to query list
  // 4. below function on query list

// {  copylist
//   for quer in qieryes
//     copy.filter ($.location =quer )
//     [].filter ()
//   return coply}






module.exports = router;
