import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const EmployeeSchema = new Schema({
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
    required: true,
    select: false
  },
  newEmployee: {
    type: 'Boolean'
  },
  admin: {
    type: 'Boolean'
  }
})

EmployeeSchema.pre('save', function(next) {
  let employee = this

  if(!employee.isModified('password')) return next()

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash('B4c0/\/', salt, (err, hash) => {
      if(err) return next(err)

        employee.password = hash
        next()
    })
  })
})

EmployeeSchema.methods.comparePassword = (password) => {
  let employee = this

  return bcrypt.compareSync(password, employee.password)
}

export default mongoose.model('Employee', EmployeeSchema)
