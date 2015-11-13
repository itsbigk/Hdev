import mongoose, { Schema } from 'mongoose'

const DeviceSchema = new Schema({
  owner: {
    type: 'ObjectId',
    required: true
  },
  serial: {
    type: 'String',
    required: true
  },
  manufacturer: {
    type: 'String'
  }
})

export default mongoose.model('Device', DeviceSchema)
