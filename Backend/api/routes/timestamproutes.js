var express = require('express');
var router = express.Router();
const timestampMethods = require('../db_modules/timestampmodules');


router.post('/setOnlineStatusOnline', async function (req, res) {
   await timestampMethods.setOnlineStatusOnline(req.body);
  const response = {
    "status": "ok",
    // "data": result      
  }
  res.status(200).json(response);
});

module.exports = router;