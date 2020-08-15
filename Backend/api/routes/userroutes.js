var express = require('express');
var router = express.Router();
const userMethods = require('../db_modules/usermodules');
require('dotenv').config();
const jwt = require('jsonwebtoken')
const ENV = process.env.NODE_ENV || 'development';
const config = require(`../config/${ENV}.js`);

router.post('/ValidateLogin', async function (req, res) {
  const result = await userMethods.validateLogin(req.body);

  if (result[0][0].UserID > 0) {
    // console.log(req.body,req,"apparel")
    const postData = req.body;
    let user = {
      "email": postData.email,
      "uid": "trackcovid_a5j1gsyu5d86u4tyaloyuy4",
      "iss": "TrackCovid_Portal",
      "sub": "testuser@lambdazen.com",
      "ver": "1.0"
    }

    // do the database authentication here, with user name and password combination.
    const token = jwt.sign(user, config.jwt.secret, { expiresIn: config.jwt.tokenLife });
    const refreshToken = jwt.sign(user, config.jwt.refreshTokenSecret, { expiresIn: config.jwt.refreshTokenLife });

    const tokenDetails = {
      "token": token,
      "refreshToken": refreshToken,
      "userID": result[0][0].UserID,
      "tokenData": user
    }
    const jwtResponse = await userMethods.insertJWTToken(tokenDetails);
    if (jwtResponse.affectedRows <= 0) {
      return res.status(401).send({
        "status": "error",
        "errorMessage": 'Error in saving token'
      });
    }
    const response = {
      "status": "ok",
      "token": token,
      "refreshToken": refreshToken,
      "user": result[0][0]
    }

    res.status(200).json(response);
  }
  else {
    return res.status(401).send({
      "status": "error",
      "errorMessage": 'Error in authenticating user'
    });
  }
});

router.post('/renewtoken', async (req, res) => {
  const postData = req.body;

  // if refresh token exists
  if ((postData.refreshToken)) {
    var tokenDetails = await userMethods.getTokenDetails(postData.refreshToken);
    if (!tokenDetails) {
      return res.status(401).send({
        "status": "error",
        "errorMessage": 'Unable to fetch token details'
      });
    }

    const token = jwt.sign(tokenDetails.tokenData, config.jwt.secret, { expiresIn: config.jwt.tokenLife })
    const response = {
      "status": "ok",
      "token": token,
    }
    tokenDetails.token = token;
    tokenDetails.refreshToken = postData.refreshToken;
    // update the token in the list
    const jwtResponse = await userMethods.insertJWTToken(tokenDetails);
    if (jwtResponse.affectedRows <= 0) {
      return res.status(401).send({
        "status": "error",
        "errorMessage": 'Error in saving token'
      });
    }

    res.status(200).json(response);
  } else {
    //req.session.save();
    res.status(401).send({
      "status": "error",
      "errorMessage": 'Invalid request'
    });
  }

});
const tokenChecker = require('../helper/tokenchecker');
router.post('/SaveUser', tokenChecker, async (req, res) => {
  const user = await userMethods.getUser(req.body);
  
  // if (user[0].length && user[0][0].UserID > 0)
  // res.status(401).send({
  //   "status": "error",
  //   "errorMessage": 'User with the same email ID exists already'
  // });
  
  // const result = await userMethods.insertUser(req.body);
  const response = {
    "status": "ok",
    "result": user,
  };
  res.json(response);

});

router.post('/decrypt', tokenChecker, async (req, res) => {
  const user = await userMethods.decrypt(req.body);
  
  // if (user[0].length && user[0][0].UserID > 0)
  // res.status(401).send({
  //   "status": "error",
  //   "errorMessage": 'User with the same email ID exists already'
  // });
  
  // const result = await userMethods.insertUser(req.body);
  const response = {
    "status": "ok",
    "result": user,
  };
  res.json(response);

});
router.post('/ChangePassword', tokenChecker, async (req, res) => {
  // refresh the damn token
  const result = await userMethods.changePassword(req.body);
  const response = {
    "status": "ok",
    //"result": result,
  };
  res.json(response);

});

module.exports = router;
