import EmployeeTypes from '../constants/EmployeeConstants'

const authHeader = new Headers()
const authString = 'Authorization: AUTH ' + localStorage.getItem(HDEV_AUTH_TOKEN)

authHeader.append(authString)

const employeeActions = {
  auth: () => {
    
  },

  login: (employee) => {

  },

  logout: (employee) => {

  }
}
