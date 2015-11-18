import Device from '../models/Device'
import User from '../models/User'

class deviceController {

  getDevices(req, res) {
    Device.find({}, (err, devices) => {
      if(err) res.send(err)

      res.json(devices)
    })
  }

  newDevice(req, res) {
    let device = new Device()

    device.owner = req.body.owner
    device.serial = req.body.serial
    device.manufacturer = req.body.manufacturer
    device.lost = false

    device.save((err) => {
      console.log(device)

      if(err) {
        if(err.code === 11000) {
          return res.json({
            success: false,
            message: 'This device is already registered to a user.'
          })
        } else {
          res.send(err)
        }
      }
      // push device to user to complete ownership
      User.findById(req.body.owner, (err, user) => {
        if(err) res.send(err)

        user.devices.push(device)

        user.save((err) => {
          if(err) res.send(err)
        })
      })

      res.json({ message: 'Device successfully added.' })
    })
  }

  getSingleDevice(req, res) {
    Device.findById(req.params.device_id, (err, device) => {
      if(err) res.send(err)

      res.json(device)
    })
  }
  // put routes are not needed because the physical device should never change once saved

  deleteDevice(req, res) {

    Device.findById(req.params.device_id, (err, device) => {
      User.findById(device.owner, (err, user) => {
        let devicePosition = user.devices.indexOf(req.params.device_id)

        user.devices.splice(devicePosition, 1)

        user.save((err) => {
          if(err) res.send(err)

          Device.remove({
            _id: req.params.device_id
          }, (err, device) => {
            if(err) res.send(err)

            res.json({ message: 'Device removed.' })
          })
        })
      })
    })
  }
}

export default new deviceController
