import EmployeeTypes from '../constants/EmployeeConstants'
import localStorage from 'localStorage'
import AppDispatcher from '../dispatchers/AppDispatcher'

if(localStorage.getItem('HDEV_AUTH_TOKEN') !== null) {
  const authString = 'Authorization: AUTH ' + localStorage.getItem('HDEV_AUTH_TOKEN')
}

class employeeActions {
  auth(token, callback) {

  }

  login(employee) {

  }

  logout(employee) {

  }
}

export default new employeeActions
