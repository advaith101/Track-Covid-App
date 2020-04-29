var express = require('express');
var router = express.Router();
const absenceMethods = require('../db_modules/absencemodules');


router.post('/InsertAbsence', async function (req, res) {
   await absenceMethods.insertAbsence(req.body);
  const response = {
    "status": "ok",
    // "data": result      
  }
  res.status(200).json(response);
});
router.post('/UpdateAbsence', async function (req, res) {
  await absenceMethods.insertAbsence(req.body);
  const response = {
    "status": "ok",
    // "data": result      
  }
  res.status(200).json(response);

});
router.post('/GetAbsence', async function (req, res) {
  let postData = req.body;
postData.isAdmin =0;
  const result = await absenceMethods.getAbsence(postData);
  const response = {
    "status": "ok",
     "data": result      
  }
  res.status(200).json(response);

});
router.post('/GetAllAbsence', async function (req, res) {
  let postData = req.body;
  postData.isAdmin =1;
  const result = await absenceMethods.getAbsence(postData);
  const response = {
    "status": "ok",
     "data": result      
  }
  res.status(200).json(response);

});
router.post('/DeleteAbsence', async function (req, res) {
  const result = await absenceMethods.deleteAbsence(req.body);
  const response = {
    "status": "ok",
    // "data": result      
  }
  res.status(200).json(response);

});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
