import redisController from './redis'
import tokenController from './token'
import config from '../config/serverConstants'

class auth {

  verify(req, res, next) {
    let headers = req.headers

    if(headers == null) return res.sendStatus(401)

    try {
      let token = tokenController.extractTokenFromHeader(headers)
    } catch(err) {
      console.log(err)
      return res.sendStatus(401)
    }

    redisController.getDataByToken(token, (err, data) => {
      if(err) return res.sendStatus(401)

      req._user = data

      next()
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
          callback(null, token)
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
      console.log(err)
      return callback(err)
    }
  }
}

export default new auth
