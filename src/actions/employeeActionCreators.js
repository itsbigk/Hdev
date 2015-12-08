import EmployeeTypes from '../constants/EmployeeConstants'
import AppDispatcher from '../dispatchers/AppDispatcher'
import request from 'superagent'
import localStorage from 'localStorage'

const authString = 'AUTH ' + localStorage.getItem('HDEV_AUTH_TOKEN')

class employeeActions {
  auth(token, callback) {

  }

  login(employee) {
    request
      .post('/api/employees/login')
      .send(employee)
      .end((err, res) => {
        if(res.ok) {
          console.log(res)
          localStorage.setItem('HDEV_AUTH_TOKEN', res.body.token)

          AppDispatcher.dispatch({
            type: EmployeeTypes.LOGIN,
            data: res.body
          })
        } else {
          console.log(err)
        }
      })
  }

  logout(employee) {
    request
      .post('/api/employees/logout')
      .set('Authorization ', authString)
      .end((err, res) => {
        if(res.ok) {
          localStorage.removeItem('HDEV_AUTH_TOKEN')

          AppDispatcher.dispatch({
            type: EmployeeTypes.LOGOUT,
            data: res.body
          })
        }
      })
  }
}

export default new employeeActions
