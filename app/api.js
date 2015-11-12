import { Router } from 'express'
import User from './models/User'

export default function() {
   let api = Router()

   api.use((req, res, next) => {
     console.log('Connecting to the api...')
     next()
   })

   api.get('/', (req, res) => {
     res.json({
       version: '1.0'
     })
   })

    api.get('/users', (req, res) => {
      User.find({}, (err, users) => {
        res.json(users)
      })
    })

    api.post('/users', (req, res) => {
      let user = new User()

      user.name = req.body.name
      user.email = req.body.email
      user.password = req.body.password
      user.admin = req.body.admin

      user.save((err) => {

        console.log(user)

        if(err) {
          // checking duplicates
          if(err.code === 11000) {
            return res.json({
              success: false,
              message: 'A user with that email already exists.'
            })
          } else {
            return res.send(err)
          }
        }
        res.json({ message: 'User created successfully' })
      })
    })

    // single user routes
    api.get('/users/:user_id', (req, res) => {
      User.findById(req.params.user_id, (err, user) => {
        if(err) res.send(err)

        res.json(user);
      })
    })

    api.put('/users/:user_id', (req, res) => {
      User.findById(req.params.user_id, (err, user) => {
        if(err) res.send(err)

        if(req.body.name) user.name = req.body.name
        if(req.body.email) user.email = req.body.email
        if(req.body.password) user.password = req.body.password
        if(req.body.admin) user.admin = req.body.admin

        user.save((err) => {
          if(err) res.send(err)

          res.json({ message: 'User updated.' })
        })
      })
    })

    api.delete('/users/:user_id', (req, res) => {
      User.remove({
        _id: req.params.user_id,
      },(err, user) => {
        if(err) return res.send(err)

        res.json({ message: 'User deleted.' })
      })
    })

   return api
}
