import Store from './store'
import AppDispatcher from '../dispatchers/AppDispatcher'
import AppTypes from '../constants/AppConstants'
import UserTypes from '../constants/UserConstants'

let userState = {
  currentUser: {},
  users: []
}

class userStore extends Store {
  constructor() {
    super()
  }

  getAllUsers() {
    return userState.users
  }

  getCurrentUser() {
    return userState.currentUser
  }
}

let UserStore = new userStore()

UserStore.dispatchToken = AppDispatcher.register(action => {
  switch (action.type) {
    case UserTypes.LOGIN:
      userState.currentUser = action.user
      break

    case UserTypes.LOGOUT:
      userState.currentUser = {}
      break

    case UserTypes.REGISTER:
      userState.currentUser = action.user
      break

    case UserTypes.LIST:
      userState.users = action.users
      break

    default:
      return
  }

  UserStore.emitChange()
})

export default UserStore
