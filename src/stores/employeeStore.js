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

  getCurrentEmployee() {
    return this.state.currentEmployee
  }

  _registerToActions(action) {
    switch(action.type) {
      case EmployeeTypes.APP_INIT:
        this.state.currentEmployee = action.data
        this.state._notification = action.message
        break
        
      case EmployeeTypes.LOGIN:
        this.state.currentEmployee = action.data.employee
        break

      case EmployeeTypes.LOGOUT:
        this.state.currentEmployee = null
        this._notification = action.data.message
        break

      case EmployeeTypes.NEW_EMPLOYEE:
        this.state.employees = action.data.employees
        break

      case EmployeeTypes.UPDATE_EMPLOYEE:
        this.state.employees = action.data.employees
        break

      case EmployeeTypes.GET_EMPLOYEE:
        this.state.employee = action.data.employee
        break

      case EmployeeTypes.EMPLOYEE_LIST:
        this.state.employees = action.data.employees
        break

      default:
        break
    }

    this.emitChange()
  }
}

export default new employeeStore()
