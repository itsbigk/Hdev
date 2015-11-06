import mongoose from 'mongoose'

export default function(callback) {
  mongoose.connect('mongodb://localhost/testConnection')

  mongoose.connection.on('open', (ref) => {
    console.log('Connected to mongo server.')
    callback()
  })

  mongoose.connection.on('error', (err) => {
    console.log('Could not connect to mongo server! Error: %s', err)
  })
}
