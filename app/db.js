import mongoose from 'mongoose'
import config from './config/serverConstants'

export default function(callback) {
  mongoose.connect(config.localDB)

  mongoose.connection.on('open', (ref) => {
    console.log('Connected to mongo server.')
    callback()
  })

  mongoose.connection.on('error', (err) => {
    console.log('Could not connect to mongo server! Error: %s', err)
  })
}
