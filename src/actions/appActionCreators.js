import AppTypes from '../constants/AppConstants'
import EmployeeTypes from '../constants/EmployeeConstants'
import AppDispatcher from '../dispatchers/AppDispatcher'
import request from 'superagent'

const authString = 'AUTH ' + localStorage.getItem('HDEV_AUTH_TOKEN')

class AppActions {
  appInit() {
    if(localStorage.getItem('HDEV_AUTH_TOKEN') != undefined) {
      request
        .post('/api/employees/verify')
        .set('Authorization', authString)
        .end((err, res) => {
          if(res.ok) {
            console.log('verified')
            console.log(res.body);
            AppDispatcher.dispatch({
              type: EmployeeTypes.LOGIN,
              data: res.body
            })
          } else {
            console.log(err)
            AppDispatcher.dispatch({
              type: AppTypes.APP_INIT,
              message: 'Please log in.',
              data: null
            })
          }
        })
      } else {
        console.log('no login info')
        AppDispatcher.dispatch({
          type: AppTypes.APP_INIT,
          message: 'Please log in.',
          data: null
        })
      }
  }
}

export default new AppActions
