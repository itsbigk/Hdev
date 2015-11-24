import { Router } from 'express'
import userController from './controllers/userController'
import deviceController from './controllers/deviceController'
import employeeController from './controllers/employeeController'
import authController from './controllers/authController'

// import User from './models/User'
// import Device from './models/Device'

export default function() {
   let api = Router()

  // @TODO authentication routes
  // @TODO flash messages from server to client
   api.get('/', (req, res) => {
     res.json({
       version: '1.0'
     })
   })

    // begin user routes

    api.route('/users')

      .get(userController.getUsers)

      .post(userController.newUser)

    // single user routes
    api.route('/users/:user_id')

      .get(userController.getSingleUser)

      .put(userController.updateUser)

      .delete(userController.deleteUser)
    // end user routes

    // begin device routes

    api.route('/devices')

      .get(deviceController.getDevices)

      .post(deviceController.newDevice)

    // single device routes
    api.route('/devices/:device_id')

      .get(deviceController.getSingleDevice)

      .delete(deviceController.deleteDevice)
    // end device routes

    // begin employee routes

    api.route('/employees')

      .get(employeeController.getEmployees)

      .post(employeeController.newEmployee)

    // single employee routes
    api.route('/employees/:employee_id')

      .get(authController.verify, employeeController.getSingleEmployee)

      .put(employeeController.updateEmployee)

      .delete(employeeController.deleteEmployee)

    // employee login route
    api.route('/employees/login')

      .post(employeeController.login)

    // employee logout route
    api.route('/employees/logout')

      .post(employeeController.logout)

    // end employee routes

   return api
}
