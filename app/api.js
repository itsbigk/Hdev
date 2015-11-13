import { Router } from 'express'
import mongoose from 'mongoose'
import User from './models/User'
import Device from './models/Device'

export default function() {
   let api = Router()

   // @TODO authentication
   api.use((req, res, next) => {
     console.log('Connecting to the api...')
     next()
   })

   api.get('/', (req, res) => {
     res.json({
       version: '1.0'
     })
   })

    // begin user routes

    api.route('/users')

      .get((req, res) => {
        User.find({}, (err, users) => {
          if(err) res.send(err)

          res.json(users)
        })
      })

      .post((req, res) => {
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
    api.route('/users/:user_id')

      .get((req, res) => {
        User.findById(req.params.user_id, (err, user) => {
          if(err) res.send(err)

          res.json(user);
        })
      })

      .put((req, res) => {
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

      .delete((req, res) => {
        User.remove({
          _id: req.params.user_id,
        },(err, user) => {
          if(err) return res.send(err)

          res.json({ message: 'User deleted.' })
        })
      })
    // end user routes

    // begin device routes
    api.route('/devices')

      .get((req, res) => {
        Device.find({}, (err, devices) => {
          if(err) res.send(err)

          res.json(devices)
        })
      })

      .post((req, res) => {
        let device = new Device()

        device.owner = req.body.owner
        device.serial = req.body.serial
        device.manufacturer = req.body.manufacturer

        device.save((err) => {
          if(err) res.send(err)

          console.log(device)

          // push device to user to complete ownership
          User.findById(req.body.owner, (err, user) => {
            if(err) res.send(err)

            user.devices.push(device._id)

            user.save((err) => {
              if(err) res.send(err)
            })
          })

          res.json({ message: 'Device successfully added.' })
        })
      })

      // @TODO create route that handles device being removed from the database
      // and then proceed to being removed from the users list of devices

    // single device routes
    // put routes are not needed because the physical device should never change once saved
    api.route('/devices/:device_id')

      .get((req, res) => {
        Device.findById(req.params.device_id, (err, device) => {
          if(err) res.send(err)

          res.json(device)
        })
      })

      .delete((req, res) => {
        Device.remove({
          _id: req.params.device_id
        }, (err, device) => {
          if(err) res.send(err)

          res.json({ message: 'Device removed.' })
        })
      })

   return api
}
