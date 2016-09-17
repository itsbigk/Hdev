import Store from './store'
import UserTypes from '../constants/UserConstants'

class userStore extends Store {
  constructor() {
    super()
    this._users = null
    this._user = null
    this.subscribe(() => this._registerToActions.bind(this))
  }

  _registerToActions(action) {
    switch(action.type) {
      case UserTypes.GET:
        this._user = action.user
        break

      case UserTypes.NEW:
        this._users = action.users
        break

      case UserTypes.UPDATE:
        this._user = action.user
        break

      case UserTypes.LIST:
        this._users = action.users
        break

      case UserTypes.DELETE:
        this._users = action.users
        break

      default:
        break
    }

    this.emitChange()
  }

  getAllUsers() {
    return this._users
  }
}

const UserStore = new userStore()

export default UserStore
