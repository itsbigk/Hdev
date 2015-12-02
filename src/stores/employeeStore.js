import Store from '../stores/store'
import EmployeeTypes from '../constants/EmployeeConstants'

class employeeStore extends Store {
  constructor() {
    super()
    this.state = {}
    this._notification = null
    this.subscribe(() => this._registerToActions.bind(this))
  }

  getState() {
    return this.state
  }

  _registerToActions(action) {
    switch(action.type) {
      case EmployeeTypes.LOGIN:
        console.log('in store')
        console.log(action)
        this.state.currentEmployee = action.data.employee
        console.log(this.state)
        localStorage.setItem('HDEV_AUTH_TOKEN', action.data.token)
        break

      case EmployeeTypes.LOGOUT:
        localStorage.removeItem('HDEV_AUTH_TOKEN')
        this.state.currentEmployee = null
        this._notification = action.data
        break

      case EmployeeTypes.NEW_EMPLOYEE:
        this.state.employees = action.employees
        break

      case EmployeeTypes.UPDATE_EMPLOYEE:
        this.state.employees = action.employees
        break

      case EmployeeTypes.GET_EMPLOYEE:
        this.state.employee = action.employee
        break

      case EmployeeTypes.EMPLOYEE_LIST:
        this.state.employees = action.employees
        break

      default:
        break
    }

    this.emitChange()
  }
}

export default new employeeStore()
