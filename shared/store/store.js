import { EventEmitter } from 'events'
import AppDispatcher from '../dispatchers/AppDispatcher'

const CHANGE_EVENT = 'change'

class Store extends EventEmitter {

  constructor() {
    super()
  }

  subscribe(actionSubscribe) {
    this._dispatchToken = AppDispatcher.register(actionSubscribe())
  }

  emitChange() {
    this.emit(CHANGE_EVENT)
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }
}

export default Store
