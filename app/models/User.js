import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = model('User', new Schema({
  email: 'String',
  password: 'String',
  admin: 'Boolean'
}))
