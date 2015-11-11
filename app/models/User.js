import { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
  name: {
    type: 'String',
    required: true
  },
  email: {
    type: 'String',
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: 'String',
    required: true
  },
  admin: {
    type: 'Boolean'
  }
})

// run before save
UserSchema.pre('save', (next) => {
  let user = this

  // for new users
  if(!user.isModified('password')) return next()

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash('B4c0/\/', salt, (err, hash) => {
      if(err) return next(err)

        user.password = hash
        next()
    })
  })
})

UserSchema.methods.comparePassword = (password) => {
  let user = this

  return bcrypt.compareSync(password, user.password)
}

export default mongoose.model('User', UserSchema)
