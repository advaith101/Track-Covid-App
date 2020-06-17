var express = require('express');
var router = express.Router();
const timestampMethods = require('../db_modules/timestampmodules');


router.post('/setOnlineStatus', async function (req, res) {
   await timestampMethods.setOnlineStatusOnline(req.body);
  const response = {
    "status": "ok",
    // "data": result      
  }
  res.status(200).json(response);
});

router.post('/getOnlineStatus', async function (req, res) {
  const result = await timestampMethods.getOnlineStatus(req.body);
  const response = {
    "status": "ok",
     "data": result      
  }
  res.status(200).json(response);
  });

router.post('/addClockin', async function (req, res) {
   await timestampMethods.addClockin(req.body);
  const response = {
    "status": "ok",
    // "data": result      
  }
  res.status(200).json(response);
});

router.post('/addClockOut', async function (req, res) {
   await timestampMethods.addClockOut(req.body);
  const response = {
    "status": "ok",
    // "data": result      
  }
  res.status(200).json(response);
});

module.exports = router;