import redisController from './redisController'
import tokenController from './tokenController'
import config from '../config/serverConstants'

class authController {

  verify(req, res) {
    let headers = req.headers

    if(headers == null) return res.sendStatus(401)

    let token = tokenController.extractTokenFromHeader(headers)

    redisController.getDataByToken(token, (err, data) => {
      if(err) return res.sendStatus(401)

      return res.status(200).json(data)
    })
  }

  verifyAdmin(req, res, next) {
    let headers = req.headers

    if(headers == null) return res.sendStatus(401)

    let token = tokenController.extractTokenFromHeader(headers)

    redisController.getDataByToken(token, (err, data) => {
      if(err) return res.sendStatus(401)

      if(data.admin == 'true') {
        next()
      } else {
        return res.sendStatus(401)
      }
    })
  }

  createAndStoreToken(data, ttl, callback) {
    data = data || {}
    ttl = ttl || config.AUTH_TTL

    if(data != null && typeof data !== 'object') callback(new Error('Data is not an Object.'))
    if(ttl != null && typeof ttl !== 'number') callback(new Error('TTL is not a valid number'))

    tokenController.createToken((err, token) => {
      if(err) callback(err)

      redisController.setTokenWithData(token, data, ttl, (err, success) => {
        if(err) callback(err)

        if(success) {
          callback(null, token, data)
        } else {
          callback(new Error('Error when saving token.'))
        }
      })
    })
  }

  expireToken(headers, callback) {
    if(headers == null) callback(new Error('Headers are null.'))

    try {
      let token = tokenController.extractTokenFromHeader(headers)

      if(token == null) callback(new Error('Token is null.'))

      redisController.expireToken(token, callback)
    } catch(err) {
      return callback(err)
    }
  }
}

export default new authController
