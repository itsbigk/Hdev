import Employee from '../models/Employee'
import authController from './authController'

class employeeController {

  login(req, res) {
    // @TODO
  }

  logout(req, res) {
    // @TODO
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
      // @TODO add new employee field to know if a redirect to password creation is needed.
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
    Employee.findById(req.params.employee_id, (err, employee) => {
      if(err) res.send(err)

      if(req.body.name) employee.name = req.body.name
      if(req.body.email) employee.email = req.body.email
      if(req.body.password) employee.password = req.body.password
      if(req.body.newEmployee) employee.newEmployee = req.body.newEmployee
      if(req.body.admin) employee.admin = req.body.admin

      employee.save((err) => {
        if(err) res.send(err)

        res.json({ message: 'Employee updated.' })
      })
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
