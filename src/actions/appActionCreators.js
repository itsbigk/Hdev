import AppTypes from '../constants/AppConstants'
import AppDispatcher from '../dispatchers/AppDispatcher'
import request from 'superagent'

class AppActions {
  appInit() {
    // @TODO check to see if user is logged in based on the token from redis
    request
      .post('/api/verify')
      
  }
}

export default new AppActions
