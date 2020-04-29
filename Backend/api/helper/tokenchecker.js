const jwt = require('jsonwebtoken')
require('dotenv').config();
const ENV = process.env.NODE_ENV || 'development';
const config = require(`../config/${ENV}.js`)

module.exports = (req,res,next) => {   
  if(String(req.path).toLowerCase() == '/common/getcompanies')
  next();
  else{
  let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
  
  // decode token
  if (token) {
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length).trimLeft();
      }
    // verifies secret and checks exp
    jwt.verify(token, config.jwt.secret, function(err, decoded) {
        if (err) {
            return res.status(401).json({"status": "error", "errorMessage":'Token seems to be expired' });
        }
      req.decoded = decoded;
      next();
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
        "status": "error",
        "errorMessage": 'No token provided.'
    });
  }
}
}
