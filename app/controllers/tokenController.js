import crypto from 'crypto'
import config from '../config/serverConstants'

class tokenController {

  createToken(callback) {
    crypto.randomBytes(config.TOKEN_LENGTH, (ex, token) => {
      if(ex) callback(ex)

      if(token) {
        callback(null, token.toString('hex'))
      } else {
        callback(new Error('Error generating token.'))
      }
    })
  }

  extractTokenFromHeader(headers) {
    if(headers == null) throw new Error('Header is null.')
    if(headers.authorization == null) throw new Error('Authorization header is null.')

    let authorization = headers.authorization
    let authArr = authorization.split(' ')
    if(authArr.length != 2) throw new Error('Authorization header value is not a length of 2.')

    let token = authArr[1]
    if(token.length != config.TOKEN_LENGTH * 2) throw new Error('Token value is not the expected length')

    return token
  }
}

export default new tokenController
