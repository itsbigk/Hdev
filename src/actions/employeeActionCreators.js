import EmployeeTypes from '../constants/EmployeeConstants'
import AppDispatcher from '../dispatchers/AppDispatcher'
import request from 'superagent'
import localStorage from 'localStorage'

if(localStorage.getItem('HDEV_AUTH_TOKEN') != null) {
  const authString = 'Authorization: AUTH ' + localStorage.getItem('HDEV_AUTH_TOKEN')
}

class employeeActions {
  auth(token, callback) {

  }

  login(employee) {
    request
      .post('/api/employees/login')
      .send(employee)
      .end((err, res) => {
        if(res.ok) {
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

  }
}

export default new employeeActions
