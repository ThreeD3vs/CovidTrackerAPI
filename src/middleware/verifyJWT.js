const authService = require('../services/authService')
const { responseErrorFormated } = require('../helpers/errorHandler')

module.exports = async (req, res, next) => {
    var token = req.headers.authorization
  
    try {
      if (!token)
        return res.status(401).json({ auth: false, error: 'No token provided.' })

      const result = await authService.verifyToken(token)
      
      if(!result)
        return res.status(401).json({ auth: false, error: 'Failed to authenticate token.' })
      
      req.userId = result.id
      next() 
    } catch (err) {
        responseErrorFormated(res,err)
    }
}