import { Dispatcher } from 'flux'

class DispatcherClass extends Dispatcher {

  handleAction(action) {
    console.log('In dispatcher for action: %s', action)
    if(!action.type) {
      throw new Error('Empty action')
    }

    this.dispatch({
      type: action.type,
      action: action
    })
  }
}

const AppDispatcher = new DispatcherClass()

export default AppDispatcher
