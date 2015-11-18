import User from '../models/User'

class userController {

  getUsers(req, res) {
    User.find({}, (err, users) => {
      if(err) res.send(err)

      res.json(users)
    })
  }

  newUser(req, res) {
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
  }

  getSingleUser(req, res) {
    User.findById(req.params.user_id, (err, user) => {
      if(err) res.send(err)

      res.json(user);
    })
  }

  updateUser(req, res) {
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
  }

  deleteUser(req, res) {
    User.remove({
      _id: req.params.user_id,
    },(err, user) => {
        if(err) return res.send(err)

        res.json({ message: 'User deleted.' })
    })
  }
}

export default new userController
