import Store from '../stores/store'
import EmployeeTypes from '../constants/EmployeeConstants'

class employeeStore extends Store {
  constructor() {
    super()
    this._employees = null
    this._employee = null
    this._currentEmployee = null
    this.subscribe(() => this._registerToActions.bind(this))
  }

  _registerToActions(action) {
    switch(action.type) {
      case EmployeeTypes.LOGIN:
        this._employee = action.employee
        break

      case EmployeeTypes.LOGOUT:
        this._currentEmployee = null
        localStorage.removeItem('HDEV_AUTH_TOKEN')
        break

      case EmployeeTypes.NEW_EMPLOYEE:
        this._employees = action.employees
        break

      case EmployeeTypes.UPDATE_EMPLOYEE:
        this._employees = action.employees
        break

      case EmployeeTypes.GET_EMPLOYEE:
        this._employee = action.employee
        break

      case EmployeeTypes.EMPLOYEE_LIST:
        this._employees = action.employees
        break

      default:
        break
    }

    this.emitChange()
  }
}

const EmployeeStore = new employeeStore()

export defualt EmployeeStore
