import mongoose, { Schema } from 'mongoose'

const DeviceSchema = new Schema({
  owner: {
    type: 'ObjectId',
    required: true
  },
  serial: {
    type: 'String',
    required: true,
    index: {
      unique: true
    }
  },
  manufacturer: {
    type: 'String'
  },
  lost: {
    type: 'Boolean'
  }
})

export default mongoose.model('Device', DeviceSchema)
