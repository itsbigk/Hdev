import Employee from '../models/Employee'
import authController from '../controllers/authController'
import tokenController from '../controllers/tokenController'
import redisController from '../controllers/redisController'
import config from '../config/serverConstants'

class employeeController {

  login(req, res) {
    Employee.findOne({ email: req.body.email }, (err, employee) => {
      if(err) throw err

      if(!employee) {
        res.json({
          success: false,
          message: 'Login failed. A user with that email does not exist.'
        })
      } else if(employee) {
        let validPassword = employee.comparePassword(req.body.password)

        if(!validPassword) {
          res.json({
            success: false,
            message: 'Password is incorrect.'
          })
        } else {
          authController.createAndStoreToken(employee.toJSON(), config.AUTH_TTL, (err, token, employee) => {
            if(err) res.sendStatus(400)

            return res.status(200).json({ success: true, message: 'Successfuly logged in.', token: token, employee: employee })
          })
        }
      }
    })
  }

  logout(req, res) {
    authController.expireToken(req.headers, (err, success) => {
      if(err) return res.sendStatus(err)

      return res.status(200).json({ message: 'Logged out successfully.' })
    })
  }

  getEmployees(req, res) {
    Employee.find({}, (err, employees) => {
      if(err) res.send(err)

      res.json(employees)
    })
  }

  newEmployee(req, res) {
    let employee = new Employee()

    employee.name = req.body.name
    employee.email = req.body.email
    employee.password = req.body.password
    employee.admin = req.body.admin
    employee.newEmployee = true

    employee.save((err) => {
      console.log(employee)

      if(err) {
        if(err.code === 11000) {
          return res.json({
            success: false,
            message: 'An employee with this email already exists'
          })
        } else {
          return res.send(err)
        }
      }
      // @TODO generate random temporary password
      // @TODO email employee with login info and link to log in and change temporary password
      // @TODO look into password expiration
      // @TODO create method to update redis if an employee is no longer a new employee (created permanent password)
      res.json({ message: 'Employee created successfully' })
    })
  }

  getSingleEmployee(req, res) {
    Employee.findById(req.params.employee_id, (err, employee) => {
      if(err) res.send(err)

      res.json(employee)
    })
  }

  updateEmployee(req, res) {
    function _saveEmployee(employee) {
      employee.save(err => {
        if(err) res.send(err)

        let headers = req.headers
        let token = tokenController.extractTokenFromHeader(headers)

        redisController.changeEmployeeData(token, employee, (err, success) => {
          if(err) res.send(err)

          if(success) {
            res.json({
              success: true,
              message: 'Employee updated.',
              employee: employee
            })
          }
        })
      })
    }

    Employee.findById(req.params.employee_id, (err, employee) => {
      if(err) res.send(err)

      if(employee.newEmployee) {
        let validPassword = employee.comparePassword(req.body.oldPassword)

        if(!validPassword) {
          res.json({
            success: false,
            message: 'Password is incorrect'
          })
        } else {
          if(req.body.newPassword) {
             employee.password = req.body.newPassword
             employee.newEmployee = false
             _saveEmployee(employee)
          }
        }
      } else if(req.body.newPassword) {
        let validPassword = employee.comparePassword(req.body.oldPassword)

        if(!validPassword) {
          res.json({
            success: false,
            message: 'Password is incorrect..'
          })
        } else {
          employee.password = req.body.newPassword

          _saveEmployee(employee)
        }
      } else {
          if(req.body.name) employee.name = req.body.name
          if(req.body.email) employee.email = req.body.email
          if(req.body.newEmployee) employee.newEmployee = req.body.newEmployee
          if(req.body.admin) employee.admin = req.body.admin

          _saveEmployee(employee)
        }

      // employee.save((err) => {
      //   if(err) res.send(err)
      //
      //   res.json({ message: 'Employee updated.' })
      // })
    })
  }

  deleteEmployee(req, res) {
    Employee.remove({
      _id: req.params.employee_id
    },(err, employee) => {
        if(err) return res.send(err)

        res.json({ message: 'Employee deleted.' })
    })
  }
}

export default new employeeController
