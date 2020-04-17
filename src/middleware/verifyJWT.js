const jwt = require('jsonwebtoken')
const authService = require('../services/authService')

module.exports = (req, res, next) => {
    var token = req.headers.authorization
    
    if (!token) 
      return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    authService.verifyToken(token).then((result) => {
      if(!result)
        return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });

      req.userId = result.id;
      next();
    }).catch((err)=>{
      res.status(err.httpStatusCode).json({ message: err.message })
    })
}