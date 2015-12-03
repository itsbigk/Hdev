import { createClient } from 'redis'
import config from '../config/serverConstants'

const redisClient = createClient()

redisClient.on('error', (err) => {
  throw(err)
})

class redisController {

  setTokenWithData(token, data, ttl, callback) {
    if(token == null) throw new Error('Token is null')
    if(data != null && typeof data !== 'object') throw new Error('Data is not an Object.')

    let userData = data || {}
    userData._ts = new Date()

    let timeToLive = ttl || config.AUTH_TTL
    if(timeToLive != null && typeof timeToLive !== 'number') throw new Error('TimeToLive is not a number.')

    redisClient.setex(token, timeToLive, JSON.stringify(userData), (err, reply) => {
      if(err) callback(err)

      if(reply) {
        callback(null, true)
      } else {
        callback(new Error('Token not set in redis.'))
      }
    })
  }

  getDataByToken(token, callback) {
    if(token == null) callback(new Error('Token is null.'))

    redisClient.get(token, (err, userData) => {
      if(err) callback(err)

      if(userData != null) callback(null, JSON.parse(userData))
      else callback(new Error('Token not found.'))
    })
  }

  changeEmployeeData(token, employee, callback) {
    if(token == null) callback('Token is null.', false)

    redisClient.set(token, JSON.stringify(employee), (err, reply) => {
      if(err) callback(err)

      if(reply) {
        callback(null, true)
      } else {
        callback(new Error('Data was not changed in redis.'))
      }
    })
  }

  expireToken(token, callback) {
    if(token == null) callback(new Error('Token is null.'))

    redisClient.del(token, (err, reply) => {
      if(err) callback(err)

      if(reply) callback(null, true)
      else callback(new Error('Token not found.'))
    })
  }
}

export default new redisController
