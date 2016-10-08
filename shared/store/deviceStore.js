import Store from './store'
import AppDispatcher from '../dispatchers/AppDispatcher'
import DeviceTypes from '../constants/DeviceConstants'

class deviceStore extends Store {

  constructor() {
    super()
    this._devices = null
    this._device = null
    this.subscribe(() => this._registerToActions.bind(this))
  }

  _registerToActions(action) {
    switch(action.type) {
      case DeviceTypes.NEW_DEVICE:
        deviceList = action.devices
        break

      case DeviceTypes.REMOVE_DEVICE:
        deviceList = action.devices
        break

      default:
        return
    }
    this.emitChange()
  }

  getDeviceList() {
    return this._devices
  }
}

let DeviceStore = new deviceStore()

export default DeviceStore
